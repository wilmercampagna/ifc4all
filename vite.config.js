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
  worker: {
    plugins: [
        comlink(),
        // comlink({ useModuleWorker: true })
    ],
  },
})