import { FastifyInstance } from 'fastify'
import { PrismaClient } from '../../generated/prisma'
import { 
  Story, 
  CreateStoryRequest,
  ApiResponse 
} from '../types/api'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

export default async function storiesRoutes(fastify: FastifyInstance) {
  // GET /api/v1/stories - 작품 목록 조회
  fastify.get('/api/v1/stories', async (request, reply) => {
    try {
      const stories = await fastify.prisma.story.findMany({
        include: {
          character: {
            select: {
              id: true,
              name: true
            }
          },
          background: {
            select: {
              id: true,
              name: true
            }
          },
          user: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })

      const response: Story[] = stories.map(story => ({
        storyId: story.id,
        characterId: story.characterId,
        backgroundId: story.backgroundId,
        writerId: story.userId || '',
        basic: story.basic,
        characterPrompt: story.characterPrompt || undefined,
        openings: story.opening ? [{
          openingSceneId: story.id,
          introId: story.id,
          opening: story.opening
        }] : undefined,
        createdAt: story.createdAt.toISOString(),
        updatedAt: story.updatedAt.toISOString()
      }))

      return reply.send({
        success: true,
        data: { stories: response }
      } as ApiResponse)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error'
      } as ApiResponse)
    }
  })

  // GET /api/v1/stories/:storyId - 작품 단일 조회
  fastify.get<{ Params: { storyId: string } }>('/api/v1/stories/:storyId', {
    schema: {
      params: {
        type: 'object',
        required: ['storyId'],
        properties: {
          storyId: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { storyId } = request.params

      const story = await fastify.prisma.story.findUnique({
        where: { id: storyId },
        include: {
          character: {
            select: {
              id: true,
              name: true
            }
          },
          background: {
            select: {
              id: true,
              name: true
            }
          },
          user: {
            select: {
              id: true,
              name: true
            }
          }
        }
      })

      if (!story) {
        return reply.status(404).send({
          success: false,
          error: 'Story not found'
        } as ApiResponse)
      }

      const response: Story = {
        storyId: story.id,
        characterId: story.characterId,
        backgroundId: story.backgroundId,
        writerId: story.userId || '',
        basic: story.basic,
        characterPrompt: story.characterPrompt || undefined,
        openings: story.opening ? [{
          openingSceneId: story.id,
          introId: story.id,
          opening: story.opening
        }] : undefined,
        createdAt: story.createdAt.toISOString(),
        updatedAt: story.updatedAt.toISOString()
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

  // POST /api/v1/stories - 작품 생성
  fastify.post<{ Body: CreateStoryRequest }>('/api/v1/stories', {
    schema: {
      body: {
        type: 'object',
        required: ['characterId', 'backgroundId'],
        properties: {
          characterId: { type: 'string' },
          backgroundId: { type: 'string' },
          characterPrompt: { type: 'string' },
          basic: { type: 'boolean' },
          opening: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const body = request.body
      // TODO: Get userId from authenticated user
      const userId = 'temp-user-id' // This should come from auth middleware

      // Verify character exists
      const character = await fastify.prisma.character.findUnique({
        where: { id: body.characterId }
      })

      if (!character) {
        return reply.status(404).send({
          success: false,
          error: 'Character not found'
        } as ApiResponse)
      }

      // Verify background exists
      const background = await fastify.prisma.background.findUnique({
        where: { id: body.backgroundId }
      })

      if (!background) {
        return reply.status(404).send({
          success: false,
          error: 'Background not found'
        } as ApiResponse)
      }

      const story = await fastify.prisma.story.create({
        data: {
          characterId: body.characterId,
          backgroundId: body.backgroundId,
          userId,
          characterPrompt: body.characterPrompt,
          basic: body.basic || false,
          opening: body.opening
        }
      })

      return reply.status(201).send({
        success: true,
        data: { storyId: story.id }
      } as ApiResponse)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(400).send({
        success: false,
        error: 'Invalid request data'
      } as ApiResponse)
    }
  })

  // DELETE /api/v1/stories/:storyId - 작품 삭제
  fastify.delete<{ Params: { storyId: string } }>('/api/v1/stories/:storyId', {
    schema: {
      params: {
        type: 'object',
        required: ['storyId'],
        properties: {
          storyId: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { storyId } = request.params

      const story = await fastify.prisma.story.findUnique({
        where: { id: storyId }
      })

      if (!story) {
        return reply.status(404).send({
          success: false,
          error: 'Story not found'
        } as ApiResponse)
      }

      // TODO: Check if user has permission to delete this story

      await fastify.prisma.story.delete({
        where: { id: storyId }
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
