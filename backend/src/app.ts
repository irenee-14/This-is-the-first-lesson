import Fastify from 'fastify'
import cors from '@fastify/cors'
import sensible from '@fastify/sensible'
import { PrismaClient } from '../generated/prisma' // 또는 '@prisma/client'
import characters from './routes/characters.js'
import backgrounds from './routes/backgrounds.js'
import stories from './routes/stories.js'
import chats from './routes/chats.js'
import user from './routes/user.js'
import personas from './routes/personas.js'
import tags from './routes/tags.js'
import auth from './routes/auth.js'

export async function createServer() {
  const fastify = Fastify({ logger: true })

  // Register plugins
  await fastify.register(cors, { origin: true })
  await fastify.register(sensible)

  // Prisma
  const prisma = new PrismaClient()
  fastify.decorate('prisma', prisma)

  // Routes (동적 import 안 써도 됨)
  await fastify.register(characters)
  await fastify.register(backgrounds)
  // await fastify.register(stories)
  // await fastify.register(chats)
  await fastify.register(user)
  // await fastify.register(personas)
  // await fastify.register(tags)
  await fastify.register(auth)

  // Graceful shutdown
  fastify.addHook('onClose', async () => {
    await prisma.$disconnect()
  })

  return fastify
}
