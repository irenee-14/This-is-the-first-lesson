import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "generated/prisma";
import {
  ApiResponse,
  CreateChatRequest,
  SendMessageRequest,
  SendMessageResponse,
} from "../types/api";
import { buildGptChat } from "../model/chatPrompt";

const prisma = new PrismaClient();

async function chatsRoutes(fastify: FastifyInstance) {
  // 채팅 생성 API
  fastify.post(
    "/api/v1/chats",
    async (
      request: FastifyRequest<{
        Body: CreateChatRequest;
      }>,
      reply: FastifyReply
    ) => {
      try {
        const { storyId, persona } = request.body;
        const userId = request.headers["x-user-id"] as string;

        if (!userId) {
          return reply.status(401).send({
            success: false,
            error: "인증이 필요합니다.",
          } as ApiResponse);
        }

        // 스토리 정보 조회
        const story = await prisma.story.findUnique({
          where: { id: storyId },
          include: {
            character: true,
            background: true,
          },
        });

        if (!story) {
          return reply.status(404).send({
            success: false,
            error: "스토리를 찾을 수 없습니다.",
          } as ApiResponse);
        }

        // 임시 페르소나 생성 (스키마에서 personaId가 필수이므로)
        const tempPersona = await prisma.persona.create({
          data: {
            userId,
            name: persona.name,
            gender: persona.gender as any,
            prompt: persona.prompt,
          },
        });

        // 채팅 생성 (페르소나 정보 직접 저장 + personaId)
        const chat = await prisma.chat.create({
          data: {
            backgroundId: story.backgroundId,
            characterId: story.characterId,
            personaId: tempPersona.id,
            storyId: story.id,
            ownerId: userId,
            chatCount: 0n,
            personaName: persona.name,
            personaGender: persona.gender,
            personaTraits: persona.prompt,
          },
        });

        // 첫 번째 메시지 (캐릭터의 오프닝)
        const openingMessage = await prisma.message.create({
          data: {
            chatId: chat.id,
            seq: 0,
            backgroundId: story.backgroundId,
            characterId: story.characterId,
            role: "character",
            contents: story.opening,
          },
        });

        return reply.send({
          success: true,
          data: {
            chatId: chat.id,
            backgroundId: chat.backgroundId,
            characterId: chat.characterId,
            storyId: chat.storyId,
            ownerId: chat.ownerId,
            personaId: chat.personaId,
            chatCount: Number(chat.chatCount),
            createdAt: chat.createdAt.toISOString(),
            updatedAt: chat.updatedAt.toISOString(),
            openingMessage: {
              chatId: openingMessage.chatId,
              seq: openingMessage.seq,
              backgroundId: openingMessage.backgroundId,
              characterId: openingMessage.characterId,
              role: openingMessage.role,
              contents: openingMessage.contents,
              createdAt: openingMessage.createdAt.toISOString(),
            },
          },
        } as ApiResponse);
      } catch (error) {
        console.error("채팅 생성 오류:", error);
        return reply.status(500).send({
          success: false,
          error: "채팅 생성 중 오류가 발생했습니다.",
        } as ApiResponse);
      }
    }
  );

  // 채팅 불러오기 API
  fastify.get(
    "/api/v1/chats/:chatId",
    async (
      request: FastifyRequest<{
        Params: { chatId: string };
      }>,
      reply: FastifyReply
    ) => {
      try {
        const { chatId } = request.params;
        const userId = request.headers["x-user-id"] as string;

        if (!userId) {
          return reply.status(401).send({
            success: false,
            error: "인증이 필요합니다.",
          } as ApiResponse);
        }

        // 채팅 정보 조회
        const chat = await prisma.chat.findUnique({
          where: { id: chatId },
          include: {
            character: true,
            background: true,
            story: true,
          },
        });

        if (!chat) {
          return reply.status(404).send({
            success: false,
            error: "채팅을 찾을 수 없습니다.",
          } as ApiResponse);
        }

        // 권한 확인
        if (chat.ownerId !== userId) {
          return reply.status(403).send({
            success: false,
            error: "채팅에 접근할 권한이 없습니다.",
          } as ApiResponse);
        }

        // 메시지 조회
        const messages = await prisma.message.findMany({
          where: { chatId },
          orderBy: { seq: "asc" },
        });

        return reply.send({
          success: true,
          data: {
            chat: {
              chatId: chat.id,
              backgroundId: chat.backgroundId,
              characterId: chat.characterId,
              storyId: chat.storyId,
              ownerId: chat.ownerId,
              personaId: chat.personaId,
              chatCount: Number(chat.chatCount),
              createdAt: chat.createdAt.toISOString(),
              updatedAt: chat.updatedAt.toISOString(),
            },
            messages: messages.map((msg) => ({
              chatId: msg.chatId,
              seq: msg.seq,
              backgroundId: msg.backgroundId,
              characterId: msg.characterId,
              role: msg.role,
              contents: msg.contents,
              createdAt: msg.createdAt.toISOString(),
            })),
          },
        } as ApiResponse);
      } catch (error) {
        console.error("채팅 조회 오류:", error);
        return reply.status(500).send({
          success: false,
          error: "채팅 조회 중 오류가 발생했습니다.",
        } as ApiResponse);
      }
    }
  );

  // 메시지 전송 API
  fastify.post(
    "/api/v1/chats/:chatId/messages",
    async (
      request: FastifyRequest<{
        Params: { chatId: string };
        Body: SendMessageRequest;
      }>,
      reply: FastifyReply
    ) => {
      try {
        const { chatId } = request.params;
        const { contents } = request.body;
        const userId = request.headers["x-user-id"] as string;

        if (!userId) {
          return reply.status(401).send({
            success: false,
            error: "인증이 필요합니다.",
          } as ApiResponse);
        }

        // 채팅 정보 조회
        const chat = await prisma.chat.findUnique({
          where: { id: chatId },
          include: {
            character: true,
            background: true,
            story: true,
          },
        });

        if (!chat) {
          return reply.status(404).send({
            success: false,
            error: "채팅을 찾을 수 없습니다.",
          } as ApiResponse);
        }

        // 권한 확인
        if (chat.ownerId !== userId) {
          return reply.status(403).send({
            success: false,
            error: "채팅에 접근할 권한이 없습니다.",
          } as ApiResponse);
        }

        // 현재 메시지 개수 조회
        const messageCount = await prisma.message.count({
          where: { chatId },
        });

        // 사용자 메시지 저장
        const userMessage = await prisma.message.create({
          data: {
            chatId,
            seq: messageCount,
            backgroundId: chat.backgroundId,
            characterId: chat.characterId,
            role: "persona",
            contents,
          },
        });

        // 최근 메시지 3개 조회 (컨텍스트용) - 사용자 메시지 포함
        const recentMessages = await prisma.message.findMany({
          where: { chatId },
          orderBy: { seq: "desc" },
          take: 3,
        });

        // GPT API 호출을 위한 히스토리 구성 (최신 사용자 메시지 포함)
        const history = recentMessages.reverse().map((msg) => ({
          role:
            msg.role === "character"
              ? ("assistant" as const)
              : ("user" as const),
          content: msg.contents,
        }));

        // GPT API 호출
        const characterDTO = {
          name: chat.character.name,
          traits: chat.character.traits,
          personality: chat.character.personality,
          dialogueStyle: chat.character.dialogueStyle,
          gender: chat.character.gender,
          description: chat.character.description,
        };

        const backgroundDTO = {
          name: chat.background.name,
          description: chat.background.description,
        };

        const storyInfo = {
          name: chat.story.name,
          characterPrompt: chat.story.characterPrompt,
          opening: chat.story.opening,
        };

        const personaInfo = {
          name: chat.personaName,
          gender: chat.personaGender,
          prompt: chat.personaTraits,
        };

        const gptResponse = await buildGptChat(
          characterDTO,
          backgroundDTO,
          storyInfo,
          personaInfo,
          history
        );

        // AI 응답 메시지 저장
        const aiMessage = await prisma.message.create({
          data: {
            chatId,
            seq: messageCount + 1,
            backgroundId: chat.backgroundId,
            characterId: chat.characterId,
            role: "character",
            contents: gptResponse,
          },
        });

        // 채팅 카운트 업데이트
        await prisma.chat.update({
          where: { id: chatId },
          data: {
            chatCount: chat.chatCount + 2n,
            updatedAt: new Date(),
          },
        });

        const response: SendMessageResponse = {
          userMessage: {
            chatId: userMessage.chatId,
            seq: userMessage.seq,
            backgroundId: userMessage.backgroundId,
            characterId: userMessage.characterId,
            role: userMessage.role,
            contents: userMessage.contents,
            createdAt: userMessage.createdAt.toISOString(),
          },
          aiMessage: {
            chatId: aiMessage.chatId,
            seq: aiMessage.seq,
            backgroundId: aiMessage.backgroundId,
            characterId: aiMessage.characterId,
            role: aiMessage.role,
            contents: aiMessage.contents,
            createdAt: aiMessage.createdAt.toISOString(),
          },
        };

        return reply.send({
          success: true,
          data: response,
        } as ApiResponse<SendMessageResponse>);
      } catch (error) {
        console.error("메시지 전송 오류:", error);
        return reply.status(500).send({
          success: false,
          error: "메시지 전송 중 오류가 발생했습니다.",
        } as ApiResponse);
      }
    }
  );
}

export default chatsRoutes;
