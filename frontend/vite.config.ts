import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";
import path from "path";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },

  server: {
    host: "0.0.0.0", // 외부 접근 허용
    port: 5174, // 포트를 5174로 고정
    strictPort: true, // 포트가 사용 중이면 에러 발생 (다른 포트로 자동 변경 방지)
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Fastify 서버 주소
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, ""), // API 경로에서 /api 제거
      },
    },
  },
});
