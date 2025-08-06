import { join } from "node:path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync, FastifyServerOptions } from "fastify";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";

export interface AppOptions
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!

  // CORS 설정 추가 (개발 환경에서 프론트엔드와 통신)
  // eslint-disable-next-line no-void
  void fastify.register(cors, {
    origin:
      process.env.NODE_ENV === "production"
        ? true
        : ["http://localhost:3000", "http://localhost:5173"], // Vite 기본 포트도 포함
    credentials: true,
  });

  // Production 환경에서 React 앱 서빙
  if (process.env.NODE_ENV === "production") {
    // eslint-disable-next-line no-void
    void fastify.register(fastifyStatic, {
      root: join(__dirname, "../../frontend/dist"),
      prefix: "/",
    });

    // SPA를 위한 fallback 설정
    fastify.setNotFoundHandler((request, reply) => {
      // API 경로가 아닌 경우 index.html 반환
      if (!request.url.startsWith("/api")) {
        reply.sendFile("index.html");
      } else {
        reply.code(404).send({ error: "Not Found" });
      }
    });
  }
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  // eslint-disable-next-line no-void
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
    prefix: "/api",
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  // eslint-disable-next-line no-void
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });
};

export default app;
export { app, options };
