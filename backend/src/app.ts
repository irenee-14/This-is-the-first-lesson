import Fastify from "fastify";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import { PrismaClient } from "../generated/prisma"; // 또는 '@prisma/client'
import characters from "./routes/characters.js";
import backgrounds from "./routes/backgrounds.js";
import user from "./routes/user.js";
import auth from "./routes/auth.js";
import backgroundFlow from "./routes/backgroundFlow.js";
import stories from "./routes/stories.js";

// import stories from './routes/stories.js'

import chats from "./routes/chats";
import path from "node:path";
// import personas from './routes/personas.js'
// import tags from './routes/tags.js'

export async function createServer() {
  const fastify = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: true,
          colorize: true,
          ignore: "pid,hostname", // 안 보고 싶은 필드 제거
        },
      },
    },
  });

  // Register plugins
  await fastify.register(cors, { origin: true });
  await fastify.register(sensible);

  // Fastify 예시
  fastify.register(require("@fastify/static"), {
    root: path.join(__dirname, "../public"),
    prefix: "/", // ← 여기 중요!
  });
  // Prisma
  const prisma = new PrismaClient();
  fastify.decorate("prisma", prisma);

  // Routes (동적 import 안 써도 됨)
  await fastify.register(characters);
  await fastify.register(backgrounds);
  await fastify.register(stories);
  await fastify.register(chats);
  await fastify.register(user);
  // await fastify.register(personas)
  // await fastify.register(tags)
  await fastify.register(auth);
  await fastify.register(backgroundFlow);

  // Graceful shutdown
  fastify.addHook("onClose", async () => {
    await prisma.$disconnect();
  });

  return fastify;
}
