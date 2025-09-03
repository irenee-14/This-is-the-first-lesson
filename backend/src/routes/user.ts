import { FastifyInstance } from 'fastify'
import { PrismaClient } from '../../generated/prisma'
import { 
  User, 
  UpdateUserRequest,
  ApiResponse 
} from '../types/api'
import { open } from 'node:fs';
import { buildGptStory } from '../model/storyPrompt'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

const DAY = 24 * 60 * 60 * 1000;
const MIN = 60 * 1000;

function formatRemain(ms: number): [number, number, number] {
  const totalMin = Math.ceil(ms / MIN);
  const days = Math.floor(totalMin / 1440);
  const hours = Math.floor((totalMin % 1440) / 60);
  const minutes = totalMin % 60;

  return [days, hours, minutes];
}


export default async function usersRoutes(fastify: FastifyInstance) {
  // GET /api/v1/users - 유저 목록(관리자)
  fastify.get('/api/v1/users', async (request, reply) => {
    try {

      const users = await fastify.prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
      })

      const response: User[] = users.map(user => ({
        userId: user.id,
        name: user.name,
        bio: user.bio || undefined,
        following: user.following,
        follower: user.follower,
        totalChat: user.totalChat,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      }))

      return reply.send({
        success: true,
        data: { users: response }
      } as ApiResponse)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error'
      } as ApiResponse)
    }
  })

  // GET /api/v1/users/:userId - 유저정보
  fastify.get<{ Params: { userId: string } }>('/api/v1/users/:userId', {
    schema: {
      params: {
        type: 'object',
        required: ['userId'],
        properties: {
          userId: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { userId } = request.params

      const user = await fastify.prisma.user.findUnique({
        where: { id: userId }
      })

      if (!user) {
        return reply.status(404).send({
          success: false,
          error: 'User not found'
        } as ApiResponse)
      }

      const response: User = {
        userId: user.id,
        name: user.name,
        bio: user.bio || undefined,
        following: user.following,
        follower: user.follower,
        totalChat: user.totalChat,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      }

      return reply.send({
        success: true,
        data: response
      } as ApiResponse)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error'
      } as ApiResponse)
    }
  })

  // PATCH /api/v1/users/:userId - 유저 정보 수정
  fastify.patch<{ 
    Params: { userId: string },
    Body: UpdateUserRequest 
  }>('/api/v1/users/:userId', {
    schema: {
      params: {
        type: 'object',
        required: ['userId'],
        properties: {
          userId: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          bio: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { userId } = request.params
      const body = request.body

      const user = await fastify.prisma.user.findUnique({
        where: { id: userId }
      })

      if (!user) {
        return reply.status(404).send({
          success: false,
          error: 'User not found'
        } as ApiResponse)
      }

      const userIdFromHeader = request.headers['x-user-id']
      if (userIdFromHeader !== userId) {
        return reply.status(403).send({
          success: false,
          error: 'You can only update your own profile'
        } as ApiResponse)
      }

      const updatedUser = await fastify.prisma.user.update({
        where: { id: userId },
        data: {
          name: body.name,
          bio: body.bio
        }
      })

      return reply.send({
        success: true,
        data: { userId: updatedUser.id }
      } as ApiResponse)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(400).send({
        success: false,
        error: 'Invalid request data'
      } as ApiResponse)
    }
  })

  // GET /api/v1/users/unlocked-backgrounds - 특정 유저의 오픈된 배경 조회
  fastify.get<{
    Querystring: { writerId?: string }
  }>('/api/v1/users/unlocked-backgrounds', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          writerId: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const userId = request.headers['x-user-id'] as string
      const { writerId } = request.query

      const user = await fastify.prisma.user.findUnique({
        where: { id: userId }
      })

      if (!user) {
        return reply.status(404).send({
          success: false,
          error: 'User not found'
        } as ApiResponse)
      }

      const where: any = { userId }
      if (writerId) {
        where.writerId = writerId
      }

      const openBackgrounds = await fastify.prisma.openBackground.findMany({
        where,
        include: {
          background: true,
          flow: true
        },
        orderBy: { openedAt: 'desc' }
      })

      const response = openBackgrounds.map(open => ({
        openId: open.id,
        userId: open.userId,
        backgroundId: open.backgroundId,
        writerId: open.writerId,
        flowId: open.flowId,
        openedAt: open.openedAt.toISOString(),
        background: {
          backgroundId: open.background.id,
          backgroundName: open.background.name,
          tags: open.background.tags,
          backgroundImg: open.background.backgroundImg
        }
      }))

      return reply.send({
        success: true,
        data: { openBackgrounds: response }
      } as ApiResponse)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error'
      } as ApiResponse)
    }
  })

  // PATCH /api/v1/users/unlocked-backgrounds - 특정 유저의 오픈 배경 추가
  fastify.patch<{
    Querystring: { writerId?: string },
    Body: { backgroundId: string }
  }>('/api/v1/users/unlocked-backgrounds', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          writerId: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        required: ['backgroundId'],
        properties: {
          backgroundId: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const userId = request.headers['x-user-id'] as string
      const { writerId } = request.query
      const { backgroundId } = request.body

      const user = await fastify.prisma.user.findUnique({
        where: { id: userId }
      })

      if (!user) {
        return reply.status(404).send({
          success: false,
          error: 'User not found'
        } as ApiResponse)
      }

      const background = await fastify.prisma.background.findUnique({
        where: { id: backgroundId }
      })

      if (!background) {
        return reply.status(404).send({
          success: false,
          error: 'Background not found'
        } as ApiResponse)
      }
      // 최신 flowId 찾기
      const latestFlow = await fastify.prisma.backgroundFlow.findFirst({
        where: { writerId: writerId || background.writerId },
        orderBy: { createdAt: 'desc' }
      });
      if (!latestFlow) {
        return reply.status(400).send({
          success: false,
          error: '해당 작가의 배경 플로우가 존재하지 않습니다.'
        } as ApiResponse);
      }

      //TODO 너무 너무 비효율적이다....
      const characters = await fastify.prisma.character.findMany({
        where: { writerId : writerId}
      })

      const openBackground = await fastify.prisma.openBackground.create({
        data: {
          userId,
          backgroundId,
          flowId: latestFlow.id,
          writerId: writerId || background.writerId
        }
      })

      // Create stories for writer's characters if they don't exist for this background and user
      if (characters.length > 0) {
        const characterIds = characters.map(c => c.id)
        const existingStories = await fastify.prisma.story.findMany({
          where: {
            userId,
            backgroundId,
            characterId: { in: characterIds }
          },
          select: { characterId: true }
        })
        const existingSet = new Set(existingStories.map(s => s.characterId))
        const toCreate = characters.filter(c => !existingSet.has(c.id))

        const payloads = await Promise.all(
          toCreate.map(async c => {
            const parsed: any = await buildGptStory(c as any, background as any)
              .then(r => (typeof r === 'string' ? JSON.parse(r) : r))
              .catch(() => null)
            return {
              userId,
              backgroundId,
              characterId: c.id,
              basic: true,
              name: parsed?.name ?? `${background.name} x ${c.name}`,
              opening: parsed?.opening ?? '',
              characterPrompt: parsed?.characterPrompt ?? c.personality
            }
          })
        )
        
        await fastify.prisma.$transaction(
          payloads.map(data => fastify.prisma.story.create({ data }))
        )

      return reply.status(201).send({
        success: true,
        data: { openId: openBackground.id }
      } as ApiResponse)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(400).send({
        success: false,
        error: 'Invalid request data'
      } as ApiResponse)
    }
  })

    // GET /api/v1/users/background-flows-with-opened - 전체 배경 플로우 + 오픈 여부
  fastify.get<{ Querystring: { writerId: string} }>(
    '/api/v1/users/background-flows-with-opened',
    {
      schema: {
        querystring: {
          type: 'object',
          required: ['writerId'],
          properties: { writerId: { type: 'string' }}
        }
      }
    },
    async (request, reply) => {
      try {
        const userId = request.headers['x-user-id'] as string
        const { writerId } = request.query;

        // 1. 전체 플로우 및 스텝, 배경 정보 조회
        const flows = await fastify.prisma.backgroundFlow.findMany({
          where: { writerId },
          orderBy: { version: 'asc' },
          include: {
            backgroundSteps: {
              include: {
                background: true
              },
              orderBy: { orderKey: 'asc' }
            }
          }
        });

        // 2. 유저가 오픈한 배경 목록 조회
        const openBackgrounds = await fastify.prisma.openBackground.findMany({
          where: { userId, writerId },
          select: { backgroundId: true }
        });
        const openedSet = new Set<string>(openBackgrounds.map((ob: { backgroundId: string }) => ob.backgroundId));

        // 3. 응답 가공
        const response = flows.map((flow: any) => ({
          flowId: flow.id,
          version: flow.version,
          steps: flow.backgroundSteps.map((step: any) => ({
            backgroundId: step.backgroundId,
            backgroundName: step.background?.name,
            tags: step.background?.tags,
            backgroundImg: step.background?.backgroundImg,
            isOpened: openedSet.has(step.backgroundId)
          }))
        }));

        return reply.send({
          success: true,
          data: { flows: response }
        } as ApiResponse);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({
          success: false,
          error: 'Internal server error'
        } as ApiResponse);
      }
    }
  );

  // GET /api/v1/users/flows-with-opened - 전체 플로우 + 오픈 여부
  fastify.get<{ Querystring: { writerId: string, characterId: string} }>(
    '/api/v1/users/flows-with-opened',
    {
      schema: {
        querystring: {
          type: 'object',
          required: ['writerId', 'characterId'],
          properties: { 
            writerId: { type: 'string' }, 
            characterId: { type: 'string'}
          }
        }
      }
    },
    async (request, reply) => {
      try {
        const userId = request.headers['x-user-id'] as string;

        const { writerId, characterId } = request.query;

        const flows = await fastify.prisma.backgroundFlow.findMany({
          where: { writerId },
          orderBy: { version: 'asc' },
          include: {
            backgroundSteps: {
              include: { background: true },
              orderBy: { orderKey: 'asc' }
            }
          }
        });
        const steps = flows.flatMap(f => f.backgroundSteps);

        const openBackgrounds = await fastify.prisma.openBackground.findMany({
          where: { userId, writerId },
          select: { backgroundId: true, openedAt: true },
          orderBy: { openedAt: 'desc' }
        });
        const latestOpenDate = openBackgrounds[0]?.openedAt.getTime();
        const openedIds = new Set(openBackgrounds.map(o => o.backgroundId));

        const bgIdsForStory: string[] = [];
        const seen = new Set<string>();

        for (const step of steps) {
          const id = step.backgroundId;
          if (openedIds.has(id) && !seen.has(id)) {
            seen.add(id);
            bgIdsForStory.push(id);
          }
        }

        const stories = bgIdsForStory.length
          ? await fastify.prisma.story.findMany({
              where: { userId, characterId, backgroundId: { in: bgIdsForStory } },
              select: { 
                id: true, 
                name: true, 
                backgroundId: true, 
                opening: true, 
                characterId: true, 
                background: { select: { tags: true } },
                character:  { select: { tags: true } },
               }
            })
          : [];

        console.log(openedIds);
        const storyByBg = Object.fromEntries(stories.map(s => [s.backgroundId, s] as const));
        let seq = 1;
        const cards = steps.map(step => {
          const bg = step.background;
          const bgId = step.backgroundId;
          const isOpen = openedIds.has(bgId);
          const story = storyByBg[bgId];
          const dDay = latestOpenDate + DAY * 7 * seq - Date.now();

          seq++;

          console.log({ bgId, isOpen, hasStory: !!story, dDay });
          if (isOpen && story && bg) {
            return {
              id: story.id,
              title: story.name,
              imgUrl: bg.backgroundImg ?? null,
              tags: Array.from(new Set([...(bg.tags as string[]), ...(story.character.tags as string[])])),
              description: story.opening ?? null,
              dDay: null,
              isOpen
            };
          }
          return {
            id: bgId,
            title: bg?.name ?? '',
            imgUrl: bg?.backgroundImg ?? null,
            tags: (bg?.tags as string[]) ?? [],
            description: bg?.description ?? null,
            dDay: formatRemain(dDay),
            isOpen: false
          };
        });

        return reply.send({ success: true, data: cards });
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({
          success: false,
          error: 'Internal server error'
        } as ApiResponse);
      }
    }
  );
}


