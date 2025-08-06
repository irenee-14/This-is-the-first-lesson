import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
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
