import { FastifyInstance } from 'fastify'
import { Gender, PrismaClient } from '../../generated/prisma'
import { 
  Character, 
  CreateCharacterRequest, 
  UpdateCharacterRequest,
  CharacterListQuery,
  ApiResponse 
} from '../types/api'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

const genderEnum = ['male', 'female', 'undisclosed'] as const

export default async function charactersRoutes(fastify: FastifyInstance) {
  // GET /api/v1/characters - 캐릭터 목록 조회
  fastify.get<{ Querystring: CharacterListQuery }>('/api/v1/characters', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'number', minimum: 1, default: 1 },
          limit: { type: 'number', minimum: 1, maximum: 100, default: 20 },
          search: { type: 'string' },
          tags: { type: 'array', items: { type: 'string' } }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { page = 1, limit = 20, search, tags } = request.query
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

      const [characters, total] = await Promise.all([
        fastify.prisma.character.findMany({
          where,
          skip,
          take: limit,
          include: {
            writer: {
              select: {
                id: true,
                name: true
              }
            },
            characterTags: {           
              select: {
                tag: { select: { id: true, name: true } }
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }),
        fastify.prisma.character.count({ where })
      ])

      const response: Character[] = characters.map(char => ({
        characterId: char.id,
        writerId: char.writerId,
        writerName: char.writer.name || '',
        name: char.name || '',
        characterImg: char.characterImg || undefined,
        traits: char.traits,
        personality: char.personality,
        dialogueStyle: char.dialogueStyle,
        gender: char.gender,
        description: char.description,
        writerNote: char.writerNote || undefined,
        tags: char.characterTags.map(ct => ct.tag.name),
        createdAt: char.createdAt.toISOString(),
        updatedAt: char.updatedAt.toISOString()
      }))

      return reply.send({
        success: true,
        data: {
          characters: response,
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

  // GET /api/v1/characters/:characterId - 캐릭터 단건 조회
  fastify.get<{ Params: { characterId: string } }>('/api/v1/characters/:characterId', {
    schema: {
      params: {
        type: 'object',
        required: ['characterId'],
        properties: {
          characterId: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { characterId } = request.params

      const character = await fastify.prisma.character.findUnique({
        where: { id: characterId },
        include: {
          writer: {
            select: {
              id: true,
              name: true
            }
          },
          characterTags: {           
            select: {
              tag: { select: { id: true, name: true } }
            }
          }
        }
      })

      if (!character) {
        return reply.status(404).send({
          success: false,
          error: 'Character not found'
        } as ApiResponse)
      }

      const response: Character = {
        characterId: character.id,
        writerId: character.writerId,
        writerName: character.writer.name || '',
        name: character.name || '',
        characterImg: character.characterImg || undefined,
        traits: character.traits,
        personality: character.personality,
        dialogueStyle: character.dialogueStyle,
        gender: character.gender,
        description: character.description,
        writerNote: character.writerNote || undefined,
        tags: character.characterTags.map(ct => ct.tag.name),
        createdAt: character.createdAt.toISOString(),
        updatedAt: character.updatedAt.toISOString()
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

  // POST /api/v1/characters - 캐릭터 생성
  fastify.post<{ Body: CreateCharacterRequest }>('/api/v1/characters', {
    schema: {
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
          characterImg: { type: 'string' },
          traits: { type: 'string' },
          personality: { type: 'string' },
          dialogueStyle: { type: 'string' },
          gender: { type: 'string', enum: [...genderEnum] },
          description: { type: 'string' },
          writerNote: { type: 'string' },
          tags: { type: 'array', items: { type: 'string' } }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const body = request.body
      const writerId = request.headers['x-user-id'] as string
      const character = await fastify.prisma.character.create({
        data: {
          writerId,
          name: body.name,
          characterImg: body.characterImg,
          traits: body.traits,
          personality: body.personality,
          dialogueStyle: body.dialogueStyle,
          gender: body.gender as Gender,
          description: body.description,
          writerNote: body.writerNote,
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
      
          await fastify.prisma.characterTag.create({
            data: {
              tagId: tag.id,
              characterId: character.id
            }
          })
          
          return tag.id
        })
      )

      return reply.status(201).send({
        success: true,
        data: { characterId: character.id }
      } as ApiResponse)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(400).send({
        success: false,
        error: 'Invalid request data'
      } as ApiResponse)
    }
  })

  // PATCH /api/v1/characters/:characterId - 캐릭터 수정
  fastify.patch<{ 
    Params: { characterId: string },
    Body: UpdateCharacterRequest 
  }>('/api/v1/characters/:characterId', {
    schema: {
      params: {
        type: 'object',
        required: ['characterId'],
        properties: {
          characterId: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          characterImg: { type: 'string' },
          traits: { type: 'string' },
          personality: { type: 'string' },
          dialogueStyle: { type: 'string' },
          gender: { type: 'string' },
          description: { type: 'string' },
          writerNote: { type: 'string' },
          tags: { type: 'array', items: { type: 'string' } }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { characterId } = request.params
      const body = request.body
      const writerId = request.headers['x-user-id'] as string

      const character = await fastify.prisma.character.findUnique({
        where: { id: characterId }
      })
      if (!character) {
        return reply.status(404).send({
          success: false,
          error: 'Character not found'
        } as ApiResponse)
      }
      if (character.writerId != writerId) {
        return reply.status(401).send({
          success: false,
          error: '권한이 없는 요청입니다.'
        } as ApiResponse)
      }

      const updatedCharacter = await fastify.prisma.character.update({
        where: { id: characterId },
        data: {
          name: body.name,
          characterImg: body.characterImg,
          traits: body.traits,
          personality: body.personality,
          dialogueStyle: body.dialogueStyle,
          gender: body.gender as Gender,
          description: body.description,
          writerNote: body.writerNote
        }
      })

      return reply.send({
        success: true,
        data: { characterId: updatedCharacter.id }
      } as ApiResponse)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(400).send({
        success: false,
        error: 'Invalid request data'
      } as ApiResponse)
    }
  })

  // DELETE /api/v1/characters/:characterId - 캐릭터 삭제
  fastify.delete<{ Params: { characterId: string } }>('/api/v1/characters/:characterId', {
    schema: {
      params: {
        type: 'object',
        required: ['characterId'],
        properties: {
          characterId: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { characterId } = request.params
      const writerId = request.headers['x-user-id'] as string

      const character = await fastify.prisma.character.findUnique({
        where: { id: characterId }
      })

      if (!character) {
        return reply.status(404).send({
          success: false,
          error: 'Character not found'
        } as ApiResponse)
      }
      if (character.writerId != writerId) {
        return reply.status(401).send({
          success: false,
          error: '권한이 없는 요청입니다.'
        } as ApiResponse)
      }

      await fastify.prisma.character.delete({
        where: { id: characterId }
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