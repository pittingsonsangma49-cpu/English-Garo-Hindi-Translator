import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    proxy: {
      '/translate': 'http://localhost:3001',
      '/garo-translate': 'http://localhost:3001',
      '/garo-category': 'http://localhost:3001',
      '/garo-categories': 'http://localhost:3001',
      '/garo-sentence': 'http://localhost:3001',
    }
  }
})
