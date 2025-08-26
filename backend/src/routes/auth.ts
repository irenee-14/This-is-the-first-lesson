import { FastifyInstance } from 'fastify'
import { PrismaClient } from '../../generated/prisma'
import { 
  LoginRequest,
  LoginResponse,
  ApiResponse 
} from '../types/api'
import bcrypt from 'bcrypt'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

export default async function authRoutes(fastify: FastifyInstance) {
  // POST /api/v1/login - 로그인
  fastify.post<{ Body: LoginRequest }>('/api/v1/login', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { email, password } = request.body

      // 이메일로 사용자 찾기
      const user = await fastify.prisma.user.findUnique({
        where: { email }
      })

      if (!user) {
        return reply.status(401).send({
          success: false,
          error: '이메일 또는 비밀번호가 올바르지 않습니다.'
        } as ApiResponse)
      }

      // 비밀번호 검증
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return reply.status(401).send({
          success: false,
          error: '이메일 또는 비밀번호가 올바르지 않습니다.'
        } as ApiResponse)
      }


      const response: LoginResponse = {
        user: {
          userId: user.id,
          name: user.name || undefined,
          bio: user.bio || undefined,
          following: user.following,
          follower: user.follower,
          totalChat: user.totalChat,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString()
        }
      }

      return reply.send({
        success: true,
        data: response
      } as ApiResponse)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({
        success: false,
        error: '서버 오류가 발생했습니다.'
      } as ApiResponse)
    }
  })

  // POST /api/v1/register - 회원가입
  fastify.post<{ Body: LoginRequest }>('/api/v1/register', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password', 'name'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
          name: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { email, password, name } = request.body

      // 이메일 중복 확인
      const existingUser = await fastify.prisma.user.findUnique({
        where: { email }
      })

      if (existingUser) {
        return reply.status(400).send({
          success: false,
          error: '이미 존재하는 이메일입니다.'
        } as ApiResponse)
      }

      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(password, 10)

      // 새 사용자 생성
      const user = await fastify.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name || email.split('@')[0]
        }
      })


      const response: LoginResponse = {
        user: {
          userId: user.id,
          name: user.name || undefined,
          bio: user.bio || undefined,
          following: user.following,
          follower: user.follower,
          totalChat: user.totalChat,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString()
        }
      }

      return reply.status(201).send({
        success: true,
        data: response
      } as ApiResponse)
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({
        success: false,
        error: '서버 오류가 발생했습니다.'
      } as ApiResponse)
    }
  })

  // TODO: Add more auth endpoints like:
  // - POST /api/v1/logout - 로그아웃
  // - POST /api/v1/refresh - 토큰 갱신
  // - GET /api/v1/me - 현재 사용자 정보
}
