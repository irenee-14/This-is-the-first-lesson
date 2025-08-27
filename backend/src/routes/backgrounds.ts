import { FastifyInstance } from 'fastify'
import { PrismaClient } from '../../generated/prisma'
import { 
  Background, 
  CreateBackgroundRequest, 
  UpdateBackgroundRequest,
  BackgroundListQuery,
  ApiResponse 
} from '../types/api'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

export default async function backgroundsRoutes(fastify: FastifyInstance) {
  // GET /api/v1/backgrounds - 배경 목록 조회
  fastify.get<{ Querystring: BackgroundListQuery }>('/api/v1/backgrounds', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'number', minimum: 1, default: 1 },
          limit: { type: 'number', minimum: 1, maximum: 100, default: 20 },
          search: { type: 'string' },
          tags: { type: 'array', items: { type: 'string' } },
          writerId: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { page = 1, limit = 20, search, tags, writerId } = request.query
      const skip = (page - 1) * limit

      const where: any = {}
      
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      }

      if (tags && tags.length > 0) {
        where.tags = {
          hasSome: tags
        }
      }

      if (writerId) {
        where.writerId = writerId
      }

      const [backgrounds, total] = await Promise.all([
        fastify.prisma.background.findMany({
          where,
          skip,
          take: limit,
          include: {
            writer: {
              select: {
                id: true,
                name: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }),
        fastify.prisma.background.count({ where })
      ])

      const response: Background[] = backgrounds.map(bg => ({
        backgroundId: bg.id,
        backgroundName: bg.name || '',
        writerId: bg.writerId,
        writerName: bg.writer.name || '',
        description: bg.description,
        tags: bg.tags,
        introTitle: bg.introTitle,
        introDescription: bg.introDescription,
        unlockChatCount: bg.unlockChatCount || undefined,
        backgroundImg: bg.backgroundImg || undefined,
        createdAt: bg.createdAt.toISOString(),
        updatedAt: bg.updatedAt.toISOString()
      }))

      return reply.send({
        success: true,
        data: {
          backgrounds: response,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        }
      } as ApiResponse)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error'
      } as ApiResponse)
    }
  })

  // GET /api/v1/backgrounds/:backgroundId - 배경 단건 조회
  fastify.get<{ Params: { backgroundId: string } }>('/api/v1/backgrounds/:backgroundId', {
    schema: {
      params: {
        type: 'object',
        required: ['backgroundId'],
        properties: {
          backgroundId: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { backgroundId } = request.params

      const background = await fastify.prisma.background.findUnique({
        where: { id: backgroundId },
        include: {
          writer: {
            select: {
              id: true,
              name: true
            }
          }
        }
      })

      if (!background) {
        return reply.status(404).send({
          success: false,
          error: 'Background not found'
        } as ApiResponse)
      }

      const response: Background = {
        backgroundId: background.id,
        backgroundName: background.name || '',
        writerId: background.writerId,
        writerName: background.writer.name || '',
        description: background.description,
        tags: background.tags,
        introTitle: background.introTitle,
        introDescription: background.introDescription,
        unlockChatCount: background.unlockChatCount || undefined,
        backgroundImg: background.backgroundImg || undefined,
        createdAt: background.createdAt.toISOString(),
        updatedAt: background.updatedAt.toISOString()
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

  // POST /api/v1/backgrounds - 배경 생성
  fastify.post<{ Body: CreateBackgroundRequest }>('/api/v1/backgrounds', {
    schema: {
      body: {
        type: 'object',
        required: ['backgroundName'],
        properties: {
          backgroundName: { type: 'string' },
          description: { type: 'string' },
          prompt: { type: 'string' },
          tags: { type: 'array', items: { type: 'string' } },
          introTitle: { type: 'string' },
          introDescription: { type: 'string' },
          unlockChatCount: { type: 'number' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const body = request.body
      const writerId = request.headers['x-user-id'] as string

      const background = await fastify.prisma.background.create({
        data: {
          writerId,
          name: body.backgroundName,
          description: body.description,
          prompt: body.prompt,
          tags: body.tags || [],
          introTitle: body.introTitle,
          introDescription: body.introDescription,
          unlockChatCount: body.unlockChatCount
        }
      })

      const tags = body.tags ?? [] 
      await Promise.all(
        tags.map(async (tagName) => {
          const tag = await fastify.prisma.tag.findUnique({
            where: { name: tagName },
            select: { id: true },
          })
      
          if (!tag) {
            // 특정 태그 못 찾으면 전체 요청 실패
            throw reply.status(400).send({
              success: false,
              error: `올바르지 않은 태그: ${tagName}`,
            } as ApiResponse)
          }
      
          await fastify.prisma.backgroundTag.create({
            data: {
              tagId: tag.id,
              backgroundId: background.id
            }
          })
          
          return tag.id
        })
      )

      const flows = await fastify.prisma.backgroundFlow.findMany({
        where: { writerId },
        orderBy: { version: 'desc' },
        include: {
          backgroundSteps: {
            include: { background: true }
          }
        }
      })

      if (flows.length === 0) {
        // 플로우가 없으면 새 플로우 생성 (version 0), 그리고 step을 따로 생성
        const newFlow = await fastify.prisma.backgroundFlow.create({
          data: {
            writerId,
            version: 0
          }
        })
        await fastify.prisma.backgroundStep.create({
          data: {
            backgroundId: background.id,
            flowId: newFlow.id,
            orderKey: 1
          }
        })
      } else {
        await Promise.all(
          flows.map(async (flow) => {
            await fastify.prisma.backgroundStep.create({
              data: {
                backgroundId: background.id,
                flowId: flow.id,
                orderKey: flow.backgroundSteps.length
              }
            })
          })
        )
      }

      return reply.status(201).send({
        success: true,
        data: { backgroundId: background.id }
      } as ApiResponse)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(400).send({
        success: false,
        error: 'Invalid request data'
      } as ApiResponse)
    }
  })

  // PATCH /api/v1/backgrounds/:backgroundId - 배경 수정
  fastify.patch<{ 
    Params: { backgroundId: string },
    Body: UpdateBackgroundRequest 
  }>('/api/v1/backgrounds/:backgroundId', {
    schema: {
      params: {
        type: 'object',
        required: ['backgroundId'],
        properties: {
          backgroundId: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        properties: {
          backgroundName: { type: 'string' },
          description: { type: 'string' },
          prompt: { type: 'string' },
          tags: { type: 'array', items: { type: 'string' } },
          introTitle: { type: 'string' },
          introDescription: { type: 'string' },
          unlockChatCount: { type: 'number' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { backgroundId } = request.params
      const body = request.body
      const writerId = request.headers['x-user-id'] as string

      const background = await fastify.prisma.background.findUnique({
        where: { id: backgroundId }
      })

      if (!background) {
        return reply.status(404).send({
          success: false,
          error: 'Background not found'
        } as ApiResponse)
      }
      if (background.writerId != writerId) {
        return reply.status(401).send({
          success: false,
          error: '권한이 없는 요청입ㄴ다.'
        } as ApiResponse)
      }

      const updatedBackground = await fastify.prisma.background.update({
        where: { id: backgroundId },
        data: {
          name: body.backgroundName,
          description: body.description,
          prompt: body.prompt,
          tags: body.tags,
          introTitle: body.introTitle,
          introDescription: body.introDescription,
          unlockChatCount: body.unlockChatCount
        }
      })

      return reply.send({
        success: true,
        data: { backgroundId: updatedBackground.id }
      } as ApiResponse)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(400).send({
        success: false,
        error: 'Invalid request data'
      } as ApiResponse)
    }
  })

  // DELETE /api/v1/backgrounds/:backgroundId - 배경 삭제
  fastify.delete<{ Params: { backgroundId: string } }>('/api/v1/backgrounds/:backgroundId', {
    schema: {
      params: {
        type: 'object',
        required: ['backgroundId'],
        properties: {
          backgroundId: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { backgroundId } = request.params
      const writerId = request.headers['x-user-id'] as string

      const background = await fastify.prisma.background.findUnique({
        where: { id: backgroundId }
      })

      if (!background) {
        return reply.status(404).send({
          success: false,
          error: 'Background not found'
        } as ApiResponse)
      }

      if (background.writerId != writerId) {
        return reply.status(401).send({
          success: false,
          error: '권한이 없는 요청입니다.'
        } as ApiResponse)
      }

      await fastify.prisma.background.delete({
        where: { id: backgroundId }
      })

      return reply.status(204).send()
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error'
      } as ApiResponse)
    }
  })
}
