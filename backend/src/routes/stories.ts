import { FastifyInstance } from 'fastify'
import { PrismaClient } from '../../generated/prisma'
import { 
  Story, 
  CreateStoryRequest,
  ApiResponse, 
  StoryListQuery
} from '../types/api'
import { buildGptStory } from 'src/model/storyPrompt'
import { generateArtworkWithVision } from 'src/model/common'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

//TODO 어떤 캐릭터의 basic 작품 조회, 어떤 배경의 basic 작품 조회하는 API 필요할까/

export default async function storiesRoutes(fastify: FastifyInstance) {
  // GET /api/v1/stories - 작품 목록 조회
  fastify.get<{ Querystring: StoryListQuery}>('/api/v1/stories', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          writerId: { type: 'string' },
          basic: { type: 'boolean' }
        }
      }
    }
  }, async (request, reply) => {
    try {

      const { writerId, basic } = request.query
      const where: any = {}
      if (writerId) where.userId = writerId
      if (basic !== undefined) where.basic = basic

      const stories = await fastify.prisma.story.findMany({
        where,
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
        name: story.name,
        characterId: story.characterId,
        backgroundId: story.backgroundId,
        writerId: story.userId || '',
        img: story.img,
        basic: story.basic,
        characterPrompt: story.characterPrompt || undefined,
        opening: story.opening,
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
        name: story.name,
        characterId: story.characterId,
        backgroundId: story.backgroundId,
        writerId: story.userId || '',
        basic: story.basic,
        img: story.img,
        characterPrompt: story.characterPrompt || undefined,
        opening: story.opening,
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

  // GET /api/v1/stories/basic?characterId= - 베이직 작품 조회
  fastify.get<{ Querystring: { characterId: string } }>('/api/v1/stories/basic', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          characterId: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const characterId = request.query.characterId

      const story = await fastify.prisma.story.findFirst({
        where: { characterId: characterId, basic: true },
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
        name: story.name,
        characterId: story.characterId,
        backgroundId: story.backgroundId,
        writerId: story.userId || '',
        basic: story.basic,
        img: story.img,
        characterPrompt: story.characterPrompt || undefined,
        opening: story.opening,
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

  // POST /api/v1/stories - 작품 생성 --> GPT API
  fastify.post<{ Body: CreateStoryRequest }>('/api/v1/stories', {
    schema: {
      body: {
        type: 'object',
        required: ['characterId', 'backgroundId', 'basic'],
        properties: {
          characterId: { type: 'string' },
          backgroundId: { type: 'string' },
          basic: { type: 'boolean' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const body = request.body
      const userId = request.headers['x-user-id'] as string

      const character = await fastify.prisma.character.findUnique({
        where: { id: body.characterId }
      })

      if (!character) {
        return reply.status(404).send({
          success: false,
          error: 'Character not found'
        } as ApiResponse)
      }

      const background = await fastify.prisma.background.findUnique({
        where: { id: body.backgroundId }
      })

      if (!background) {
        return reply.status(404).send({
          success: false,
          error: 'Background not found'
        } as ApiResponse)
      }

      if (character.writerId !== background.writerId) {
        return reply.status(403).send({
          success: false,
          error: '동일한 작가의 캐릭터와 배경만 생성 가능합니다.'
        } as ApiResponse)
      }

      //GPT API 호출해서 작품 생성
      const storyPrompt = await buildGptStory(character, background)

      const {name, characterPrompt, opening} = JSON.parse(storyPrompt || '{}')
      
      // 작품 이미지 생성
      let artworkImageUrl = null
      try {
        if (background.backgroundImg && character.characterImg) {
          const backgroundImagePath = `public/backgrounds/${background.backgroundImg}`
          const characterImagePath = `public/characters/${character.characterImg}`
          
          const artworkResult = await generateArtworkWithVision(
            backgroundImagePath,
            characterImagePath,
            `${name} - ${background.name} 배경에서 ${character.name} 캐릭터가 등장하는 판타지 작품`
          )
          
          artworkImageUrl = artworkResult.imageUrl
        }
      } catch (imageError) {
        fastify.log.warn('이미지 생성 실패, 기본값으로 진행')
      }
      
      // const userId = request.headers['x-user-id'] as string
      const story = await fastify.prisma.story.create({
        data: {
          name: name,
          characterId: body.characterId,
          backgroundId: body.backgroundId,
          userId,
          characterPrompt: characterPrompt,
          basic: body.basic || false,
          opening: opening, 
          img: artworkImageUrl || undefined
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

      if (story.userId != request.headers['x-user-id']) {
        return reply.status(403).send({
          success: false,
          error: 'Permission denied'
        } as ApiResponse)
      }

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
