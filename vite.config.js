import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import { comlink } from 'vite-plugin-comlink'

export default defineConfig({
  plugins: [
    comlink(),
    legacy({
        targets: ['defaults', 'not IE 11'],
      }),
  ],
  base: 'https://wilmercampagna.github.io/ifc4all/',
  worker: {
    plugins: [
        comlink(),
        // comlink({ useModuleWorker: true })
    ],
  },
})