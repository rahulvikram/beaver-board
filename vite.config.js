import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {
        // specify the backend URL
        target: 'http://localhost:3000',
        
        // this changes the port origin from frontend to backend
        // ensures we call from express routes, not vue routes
        changeOrigin: true, 

        // this is to remove the /api prefix when making requests to the backend
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
