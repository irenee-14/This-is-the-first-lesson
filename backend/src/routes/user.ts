import { FastifyInstance } from 'fastify'
import { PrismaClient } from '../../generated/prisma'
import { 
  User, 
  UpdateUserRequest,
  ApiResponse 
} from '../types/api'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

export default async function usersRoutes(fastify: FastifyInstance) {
  // GET /api/v1/users - 유저 목록(관리자)
  fastify.get('/api/v1/users', async (request, reply) => {
    try {
      // TODO: Check if user is admin

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
      const openBackground = await fastify.prisma.openBackground.create({
        data: {
          userId,
          backgroundId,
          flowId: latestFlow.id,
          writerId: writerId || background.writerId
        }
      })

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
  fastify.get<{ Querystring: { writerId: string, characterId?: string } }>(
    '/api/v1/users/background-flows-with-opened',
    {
      schema: {
        querystring: {
          type: 'object',
          required: ['writerId'],
          properties: { writerId: { type: 'string' }, characterId: { type: 'string' } }
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
}
