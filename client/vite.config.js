import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(),tailwindcss()],
  base: mode === 'production' ? '/Checkify.Ai/' : '/' // relative for dev, repo path for GH Pages
}))
