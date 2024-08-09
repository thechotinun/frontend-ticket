import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // eslint-disable-next-line no-undef
    port: parseInt(process.env.VITE_PORT) || 5173,
    strictPort: true,
    host: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@css': "/src/css",
      '@components': "/src/components",
      '@api': "/src/api",
    },
  },
})
