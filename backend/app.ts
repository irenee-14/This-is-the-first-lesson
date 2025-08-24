import Fastify from 'fastify'
import cors from '@fastify/cors'
import sensible from '@fastify/sensible'
import { PrismaClient } from './generated/prisma'

// Create Fastify instance
const fastify = Fastify({
  logger: true
})

// Register plugins
await fastify.register(cors, {
  origin: true
})
await fastify.register(sensible)

// Create Prisma client
const prisma = new PrismaClient()

// Register Prisma as decorator
fastify.decorate('prisma', prisma)

// Register routes
await fastify.register(import('./routes/characters'))
await fastify.register(import('./routes/backgrounds'))
await fastify.register(import('./routes/stories'))
await fastify.register(import('./routes/chats'))
await fastify.register(import('./routes/users'))
await fastify.register(import('./routes/personas'))
await fastify.register(import('./routes/tags'))
await fastify.register(import('./routes/auth'))

// Graceful shutdown
fastify.addHook('onClose', async () => {
  await prisma.$disconnect()
})

export default fastify
