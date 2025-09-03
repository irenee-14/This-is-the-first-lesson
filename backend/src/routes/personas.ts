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
  // GET /api/v1/users/personas - 페르소나 목록 조회
  fastify.get('/api/v1/users/personas', async (request, reply) => {
    try {
      const userId = request.headers['x-user-id'] as string

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
        name: persona.name,
        gender: persona.gender,
        prompt: persona.prompt,
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
        name: persona.name,
        gender: persona.gender,
        prompt: persona.prompt,
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

  // POST /api/v1/users/personas - 페르소나 생성
  fastify.post<{ 
    Body: CreatePersonaRequest 
  }>('/api/v1/users/personas', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'gender', 'prompt'],
        properties: {
          name: { type: 'string' },
          gender: { type: 'string', enum: ['male', 'female', 'undisclosed'] },
          prompt: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const userId = request.headers['x-user-id'] as string
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
      
      const persona = await fastify.prisma.persona.create({
        data: {
          userId,
          name: body.name,
          gender: body.gender as 'male' | 'female' | 'undisclosed',
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
          gender: { type: 'string', enum: ['male', 'female', 'undisclosed'] },
          prompt: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { personaId } = request.params
      const body = request.body
      const currentUserId = request.headers['x-user-id'] as string

      const persona = await fastify.prisma.persona.findUnique({
        where: { id: personaId }
      })

      if (!persona) {
        return reply.status(404).send({
          success: false,
          error: 'Persona not found'
        } as ApiResponse)
      }

      // Check if user has permission to update this persona
      if (persona.userId !== currentUserId) {
        return reply.status(403).send({
          success: false,
          error: 'Permission denied'
        } as ApiResponse)
      }

      const updateData: any = {}
      if (body.name !== undefined) updateData.name = body.name
      if (body.gender !== undefined) updateData.gender = body.gender as 'male' | 'female' | 'undisclosed'
      if (body.prompt !== undefined) updateData.prompt = body.prompt

      const updatedPersona = await fastify.prisma.persona.update({
        where: { id: personaId },
        data: updateData
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
      const currentUserId = request.headers['x-user-id'] as string

      const persona = await fastify.prisma.persona.findUnique({
        where: { id: personaId }
      })

      if (!persona) {
        return reply.status(404).send({
          success: false,
          error: 'Persona not found'
        } as ApiResponse)
      }

      // Check if user has permission to delete this persona
      if (persona.userId !== currentUserId) {
        return reply.status(403).send({
          success: false,
          error: 'Permission denied'
        } as ApiResponse)
      }

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
