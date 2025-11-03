import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig(async ({ command }) => ({
  root: 'src',
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        compiler: path.resolve(__dirname, 'src/compiler.html')
      }
    }
  }
}))
