import { defineConfig } from 'vite'
import path from 'node:path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

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
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'assets/scene/*',
          dest: 'assets/scene'
        },
        {
          src: 'assets/target/*',
          dest: 'assets/target'
        }
      ]
    })
  ]
}))
