import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 모든 SCSS 파일에 자동으로 import
        additionalData: `@use "@/styles/abstracts" as *;`,
      },
    },
  },

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
