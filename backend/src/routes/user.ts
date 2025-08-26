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

      // TODO: Check if user has permission to update this user

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

  // GET /api/v1/users/:userId/unlocked-backgrounds - 특정 유저의 오픈된 배경 조회
  fastify.get<{ 
    Params: { userId: string },
    Querystring: { writerId?: string }
  }>('/api/v1/users/:userId/unlocked-backgrounds', {
    schema: {
      params: {
        type: 'object',
        required: ['userId'],
        properties: {
          userId: { type: 'string' }
        }
      },
      querystring: {
        type: 'object',
        properties: {
          writerId: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { userId } = request.params
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
          avatarUrl: open.background.avatarUrl
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

  // PATCH /api/v1/users/:userId/unlocked-backgrounds - 특정 유저의 오픈 배경 추가
  fastify.patch<{ 
    Params: { userId: string },
    Querystring: { writerId?: string },
    Body: { backgroundId: string }
  }>('/api/v1/users/:userId/unlocked-backgrounds', {
    schema: {
      params: {
        type: 'object',
        required: ['userId'],
        properties: {
          userId: { type: 'string' }
        }
      },
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
      const { userId } = request.params
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

      const openBackground = await fastify.prisma.openBackground.create({
        data: {
          userId,
          backgroundId,
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
}
