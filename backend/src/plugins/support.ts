import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";

// 빈 플러그인 - 나중에 필요한 플러그인들을 추가할 수 있습니다
const supportPlugin: FastifyPluginAsync = async (fastify, opts) => {
  // 여기에 앱 전체에서 사용할 플러그인들을 등록합니다
  // 예: 데이터베이스 연결, 인증 등

  fastify.decorate("someSupport", () => {
    return "support plugin loaded";
  });
};

export default fp(supportPlugin);
