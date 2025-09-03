import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "generated/prisma";
import {
  ApiResponse,
  CreateChatRequest,
  SendMessageRequest,
  SendMessageResponse,
  ChatListQuery,
  ChatListResponse,
  ChatDetail,
  MessageListQuery,
  MessageListResponse,
} from "../types/api";
import { buildGptChat } from "../model/chatPrompt";

const prisma = new PrismaClient();

async function chatsRoutes(fastify: FastifyInstance) {
  // 1. 채팅 생성 API
  fastify.post(
    "/api/v1/chats",
    async (
      request: FastifyRequest<{ Body: CreateChatRequest }>,
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

        // 스토리 조회
        const story = await prisma.story.findUnique({
          where: { id: storyId },
          include: { character: true, background: true },
        });
        if (!story) {
          return reply.status(404).send({
            success: false,
            error: "스토리를 찾을 수 없습니다.",
          } as ApiResponse);
        }

        // 페르소나 생성
        const tempPersona = await prisma.persona.create({
          data: {
            userId,
            name: persona.name,
            gender: persona.gender as any,
            prompt: persona.prompt,
          },
        });

        // 채팅 생성
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

        // 첫 메시지 (캐릭터 오프닝)
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

  // 2. 채팅 목록 조회 API
  fastify.get(
    "/api/v1/chats",
    async (
      request: FastifyRequest<{ Querystring: ChatListQuery }>,
      reply: FastifyReply
    ) => {
      try {
        const userId = request.headers["x-user-id"] as string;
        const { page = 1, limit = 20, characterId, storyId } = request.query;

        if (!userId) {
          return reply.status(401).send({
            success: false,
            error: "인증이 필요합니다.",
          } as ApiResponse);
        }

        const where: any = { ownerId: userId };
        if (characterId) where.characterId = characterId;
        if (storyId) where.storyId = storyId;

        const total = await prisma.chat.count({ where });
        const chats = await prisma.chat.findMany({
          where,
          include: {
            character: { select: { name: true, characterImg: true } },
            background: { select: { name: true } },
            story: { select: { name: true } },
            messages: {
              orderBy: { seq: "desc" },
              take: 1,
              select: { contents: true, createdAt: true },
            },
          },
          orderBy: { updatedAt: "desc" },
          skip: (page - 1) * limit,
          take: limit,
        });

        const chatSummaries = chats.map((chat) => ({
          chatId: chat.id,
          characterName: chat.character.name,
          characterImg: chat.character.characterImg,
          storyName: chat.story.name,
          backgroundName: chat.background.name,
          personaName: chat.personaName,
          lastMessage: chat.messages[0]?.contents,
          lastMessageAt: chat.messages[0]?.createdAt.toISOString(),
          chatCount: Number(chat.chatCount),
          createdAt: chat.createdAt.toISOString(),
          updatedAt: chat.updatedAt.toISOString(),
        }));

        return reply.send({
          success: true,
          data: {
            chats: chatSummaries,
            total,
            page,
            limit,
          } as ChatListResponse,
        } as ApiResponse<ChatListResponse>);
      } catch (error) {
        console.error("채팅 목록 조회 오류:", error);
        return reply.status(500).send({
          success: false,
          error: "채팅 목록 조회 중 오류가 발생했습니다.",
        } as ApiResponse);
      }
    }
  );

  // 3. 채팅 상세 조회 API
  fastify.get(
    "/api/v1/chats/:chatId",
    async (
      request: FastifyRequest<{ Params: { chatId: string } }>,
      reply: FastifyReply
    ) => {
      try {
        const { chatId } = request.params;
        const userId = request.headers["x-user-id"] as string;

        if (!userId)
          return reply.status(401).send({
            success: false,
            error: "인증이 필요합니다.",
          } as ApiResponse);

        const chat = await prisma.chat.findUnique({
          where: { id: chatId },
          include: { character: true, background: true, story: true },
        });

        if (!chat)
          return reply.status(404).send({
            success: false,
            error: "채팅을 찾을 수 없습니다.",
          } as ApiResponse);
        if (chat.ownerId !== userId)
          return reply.status(403).send({
            success: false,
            error: "채팅에 접근할 권한이 없습니다.",
          } as ApiResponse);

        const chatDetail: ChatDetail = {
          chatId: chat.id,
          character: {
            characterId: chat.character.id,
            name: chat.character.name,
            characterImg: chat.character.characterImg,
            traits: chat.character.traits,
            personality: chat.character.personality,
            dialogueStyle: chat.character.dialogueStyle,
            gender: chat.character.gender,
            description: chat.character.description,
          },
          background: {
            backgroundId: chat.background.id,
            name: chat.background.name,
            description: chat.background.description,
            backgroundImg: chat.background.backgroundImg,
          },
          story: {
            storyId: chat.story.id,
            name: chat.story.name,
            characterPrompt: chat.story.characterPrompt,
            opening: chat.story.opening,
          },
          persona: {
            name: chat.personaName,
            gender: chat.personaGender,
            prompt: chat.personaTraits,
          },
          chatCount: Number(chat.chatCount),
          createdAt: chat.createdAt.toISOString(),
          updatedAt: chat.updatedAt.toISOString(),
        };

        return reply.send({
          success: true,
          data: chatDetail,
        } as ApiResponse<ChatDetail>);
      } catch (error) {
        console.error("채팅 조회 오류:", error);
        return reply.status(500).send({
          success: false,
          error: "채팅 조회 중 오류가 발생했습니다.",
        } as ApiResponse);
      }
    }
  );

  // 4. 메시지 페이지네이션 조회 API
  fastify.get(
    "/api/v1/chats/:chatId/messages",
    async (
      request: FastifyRequest<{
        Params: { chatId: string };
        Querystring: MessageListQuery;
      }>,
      reply: FastifyReply
    ) => {
      try {
        const { chatId } = request.params;
        const { page = 1, limit = 50, before, after } = request.query;
        const userId = request.headers["x-user-id"] as string;

        if (!userId) {
          return reply.status(401).send({
            success: false,
            error: "인증이 필요합니다.",
          } as ApiResponse);
        }

        const chat = await prisma.chat.findUnique({
          where: { id: chatId },
          select: { ownerId: true },
        });
        if (!chat)
          return reply.status(404).send({
            success: false,
            error: "채팅을 찾을 수 없습니다.",
          } as ApiResponse);
        if (chat.ownerId !== userId)
          return reply.status(403).send({
            success: false,
            error: "채팅에 접근할 권한이 없습니다.",
          } as ApiResponse);

        const where: any = { chatId };
        if (before !== undefined) where.seq = { lt: before };
        if (after !== undefined) where.seq = { gt: after };

        const total = await prisma.message.count({ where: { chatId } });
        const messages = await prisma.message.findMany({
          where,
          orderBy: { seq: "asc" },
          skip: (page - 1) * limit,
          take: limit,
        });

        return reply.send({
          success: true,
          data: {
            messages: messages.map((msg) => ({
              chatId: msg.chatId,
              seq: msg.seq,
              backgroundId: msg.backgroundId,
              characterId: msg.characterId,
              role: msg.role,
              contents: msg.contents,
              createdAt: msg.createdAt.toISOString(),
            })),
            total,
            page,
            limit,
            hasNext: page * limit < total,
            hasPrev: page > 1,
          } as MessageListResponse,
        } as ApiResponse<MessageListResponse>);
      } catch (error) {
        console.error("메시지 조회 오류:", error);
        return reply.status(500).send({
          success: false,
          error: "메시지 조회 중 오류가 발생했습니다.",
        } as ApiResponse);
      }
    }
  );

  // 5. 메시지 전송 API
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

        const chat = await prisma.chat.findUnique({
          where: { id: chatId },
          include: { character: true, background: true, story: true },
        });
        if (!chat)
          return reply.status(404).send({
            success: false,
            error: "채팅을 찾을 수 없습니다.",
          } as ApiResponse);
        if (chat.ownerId !== userId)
          return reply.status(403).send({
            success: false,
            error: "채팅에 접근할 권한이 없습니다.",
          } as ApiResponse);

        const messageCount = await prisma.message.count({ where: { chatId } });

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

        const recentMessages = await prisma.message.findMany({
          where: { chatId },
          orderBy: { seq: "desc" },
          take: 3,
        });

        const history = recentMessages.reverse().map((msg) => ({
          role:
            msg.role === "character"
              ? ("assistant" as const)
              : ("user" as const),
          content: msg.contents,
        }));

        const gptResponse = await buildGptChat(
          {
            name: chat.character.name,
            traits: chat.character.traits,
            personality: chat.character.personality,
            dialogueStyle: chat.character.dialogueStyle,
            gender: chat.character.gender,
            description: chat.character.description,
          },
          {
            name: chat.background.name,
            description: chat.background.description,
          },
          {
            name: chat.story.name,
            characterPrompt: chat.story.characterPrompt,
            opening: chat.story.opening,
          },
          {
            name: chat.personaName,
            gender: chat.personaGender,
            prompt: chat.personaTraits,
          },
          history
        );

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

        await prisma.chat.update({
          where: { id: chatId },
          data: { chatCount: chat.chatCount + 2n, updatedAt: new Date() },
        });

        return reply.send({
          success: true,
          data: {
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
          } as SendMessageResponse,
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
