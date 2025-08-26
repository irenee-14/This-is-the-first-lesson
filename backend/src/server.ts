// src/server.ts (실행 엔트리)
import { createServer } from './app'

async function main() {
  const app = await createServer()

  // 플러그인 준비 완료 보장 (선택)
  await app.ready()

  await app.listen({ port: 3000, host: '0.0.0.0' })
  app.log.info('server started')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
//TODO 에러 핸들링 필요