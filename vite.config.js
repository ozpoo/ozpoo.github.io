import { defineConfig } from 'vite'

export default defineConfig(async ({ command }) => ({
  root: 'src',
  build: {
    outDir: '../dist'
  }
}))
