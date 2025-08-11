// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      // Все запросы, начинающиеся с /api, пойдут на Awardspace
      '/api': {
        target: 'http://hmel.myartsonline.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // убираем /api в начале
      }
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTest.js',
  },
})
