import { FastifyInstance } from 'fastify'
import { PrismaClient } from '../../generated/prisma'
import { 
  BackgroundFlow,
  CreateBackgroundFlowRequest,
  ApiResponse 
} from '../types/api'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

export default async function backgroundFlowRoutes(fastify: FastifyInstance) {
  // GET /api/v1/writers/:writerId/backgrounds/flow - 배경 플로우 전체 조회
  fastify.get<{ Params: { writerId: string } }>('/api/v1/writers/:writerId/backgrounds/flow', {
    schema: {
      params: {
        type: 'object',
        required: ['writerId'],
        properties: {
          writerId: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { writerId } = request.params

      const flows = await fastify.prisma.backgroundFlow.findMany({
        where: { writerId },
        include: {
          backgroundSteps: {
            include: {
              background: true
            },
            orderBy: { orderKey: 'asc' }
          }
        },
        orderBy: { createdAt: 'desc' }
      })

      const response: BackgroundFlow[] = flows.map(flow => ({
        flowId: flow.id,
        writerId: flow.writerId,
        version: flow.version,
        createdAt: flow.createdAt.toISOString(),
        steps: flow.backgroundSteps.map(step => ({
          stepId: step.id,
          backgroundId: step.backgroundId,
          orderKey: step.orderKey || 0
        }))
      }))

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

  // POST /api/v1/writers/:writerId/backgrounds/flow - 배경 플로우 생성
  fastify.post<{ 
    Params: { writerId: string },
    Body: CreateBackgroundFlowRequest 
  }>('/api/v1/writers/:writerId/backgrounds/flow', {
    schema: {
      params: {
        type: 'object',
        required: ['writerId'],
        properties: {
          writerId: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        required: ['steps'],
        properties: {
          steps: {
            type: 'array',
            items: {
              type: 'object',
              required: ['backgroundId', 'orderKey'],
              properties: {
                backgroundId: { type: 'string' },
                orderKey: { type: 'number' }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { writerId } = request.params
      const { steps } = request.body

      const userId = request.headers['x-user-id']
      if (writerId !== userId) {
        return reply.status(403).send({
          success: false,
          error: 'Permission denied'
        } as ApiResponse)
      }

    const latestFlow = await fastify.prisma.backgroundFlow.findFirst({
        where: { writerId },
        orderBy: { version: 'desc' },
        select: { version: true }
    })
    const nextVersion = latestFlow ? latestFlow.version : 0

      const flow = await fastify.prisma.backgroundFlow.create({
        data: {
          writerId,
          version: nextVersion,
          backgroundSteps: {
            create: steps.map(step => ({
              backgroundId: step.backgroundId,
              orderKey: step.orderKey
            }))
          }
        },
        include: {
          backgroundSteps: {
            include: {
              background: true
            },
            orderBy: { orderKey: 'asc' }
          }
        }
      })

      const response: BackgroundFlow = {
        flowId: flow.id,
        writerId: flow.writerId,
        version: flow.version,
        createdAt: flow.createdAt.toISOString(),
        steps: flow.backgroundSteps.map(step => ({
          stepId: step.id,
          backgroundId: step.backgroundId,
          orderKey: step.orderKey || 0
        }))
      }

      return reply.status(201).send({
        success: true,
        data: response
      } as ApiResponse)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(400).send({
        success: false,
        error: 'Invalid request data'
      } as ApiResponse)
    }
  })

  // DELETE /api/v1/writers/:writerId/backgrounds/flow - 플로우 삭제
  fastify.delete<{ Params: { writerId: string } }>('/api/v1/writers/:writerId/backgrounds/flow', {
    schema: {
      params: {
        type: 'object',
        required: ['writerId'],
        properties: {
          writerId: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { writerId } = request.params

      const userId = request.headers['x-user-id']
      if (writerId !== userId) {
        return reply.status(403).send({
          success: false,
          error: 'Permission denied'
        } as ApiResponse)
      }

      await fastify.prisma.backgroundFlow.deleteMany({
        where: { writerId }
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
