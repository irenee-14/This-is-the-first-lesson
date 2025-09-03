import { FastifyInstance } from 'fastify'
import { PrismaClient } from '../../generated/prisma'
import { 
  Persona, 
  CreatePersonaRequest,
  UpdatePersonaRequest,
  ApiResponse 
} from '../types/api'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

export default async function personasRoutes(fastify: FastifyInstance) {
  // GET /api/v1/users/:userId/personas - 페르소나 목록 조회
  fastify.get<{ Params: { userId: string } }>('/api/v1/users/:userId/personas', {
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

      const personas = await fastify.prisma.persona.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      })

      const response: Persona[] = personas.map(persona => ({
        personalId: persona.id,
        userId: persona.userId,
        name: persona.name || undefined,
        gender: persona.gender || undefined,
        prompt: persona.prompt || undefined,
        createdAt: persona.createdAt.toISOString(),
        updatedAt: persona.updatedAt.toISOString()
      }))

      return reply.send({
        success: true,
        data: { personas: response }
      } as ApiResponse)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error'
      } as ApiResponse)
    }
  })

  // GET /api/v1/personas/:personaId - 페르소나 단일 조회
  fastify.get<{ Params: { personaId: string } }>('/api/v1/personas/:personaId', {
    schema: {
      params: {
        type: 'object',
        required: ['personaId'],
        properties: {
          personaId: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { personaId } = request.params

      const persona = await fastify.prisma.persona.findUnique({
        where: { id: personaId }
      })

      if (!persona) {
        return reply.status(404).send({
          success: false,
          error: 'Persona not found'
        } as ApiResponse)
      }

      const response: Persona = {
        personalId: persona.id,
        userId: persona.userId,
        name: persona.name || undefined,
        gender: persona.gender || undefined,
        prompt: persona.prompt || undefined,
        createdAt: persona.createdAt.toISOString(),
        updatedAt: persona.updatedAt.toISOString()
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

  // POST /api/v1/users/:userId/personas - 페르소나 생성
  fastify.post<{ 
    Params: { userId: string },
    Body: CreatePersonaRequest 
  }>('/api/v1/users/:userId/personas', {
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
        required: ['name', 'prompt'],
        properties: {
          name: { type: 'string' },
          gender: { type: 'string' },
          prompt: { type: 'string' }
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

      // Check if user already has a persona (one-to-one relationship)
      const existingPersona = await fastify.prisma.persona.findUnique({
        where: { userId }
      })

      if (existingPersona) {
        return reply.status(409).send({
          success: false,
          error: 'User already has a persona'
        } as ApiResponse)
      }

      const persona = await fastify.prisma.persona.create({
        data: {
          userId,
          name: body.name,
          gender: body.gender,
          prompt: body.prompt
        }
      })

      return reply.status(201).send({
        success: true,
        data: { personalId: persona.id }
      } as ApiResponse)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(400).send({
        success: false,
        error: 'Invalid request data'
      } as ApiResponse)
    }
  })

  // PATCH /api/v1/personas/:personaId - 페르소나 수정
  fastify.patch<{ 
    Params: { personaId: string },
    Body: UpdatePersonaRequest 
  }>('/api/v1/personas/:personaId', {
    schema: {
      params: {
        type: 'object',
        required: ['personaId'],
        properties: {
          personaId: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          gender: { type: 'string' },
          prompt: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { personaId } = request.params
      const body = request.body

      const persona = await fastify.prisma.persona.findUnique({
        where: { id: personaId }
      })

      if (!persona) {
        return reply.status(404).send({
          success: false,
          error: 'Persona not found'
        } as ApiResponse)
      }

      // TODO: Check if user has permission to update this persona

      const updatedPersona = await fastify.prisma.persona.update({
        where: { id: personaId },
        data: {
          name: body.name,
          gender: body.gender,
          prompt: body.prompt
        }
      })

      return reply.send({
        success: true,
        data: { personalId: updatedPersona.id }
      } as ApiResponse)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(400).send({
        success: false,
        error: 'Invalid request data'
      } as ApiResponse)
    }
  })

  // DELETE /api/v1/personas/:personaId - 페르소나 삭제
  fastify.delete<{ Params: { personaId: string } }>('/api/v1/personas/:personaId', {
    schema: {
      params: {
        type: 'object',
        required: ['personaId'],
        properties: {
          personaId: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { personaId } = request.params

      const persona = await fastify.prisma.persona.findUnique({
        where: { id: personaId }
      })

      if (!persona) {
        return reply.status(404).send({
          success: false,
          error: 'Persona not found'
        } as ApiResponse)
      }

      // TODO: Check if user has permission to delete this persona

      await fastify.prisma.persona.delete({
        where: { id: personaId }
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
