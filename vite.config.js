import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import { comlink } from 'vite-plugin-comlink'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    comlink(),
    legacy({
        targets: ['defaults', 'not IE 11'],
      }),
  ],
  base: 'https://wilmercampagna.github.io/ifc4all',
  worker: {
    plugins: [
        VitePWA({
          registerType: 'autoUpdate',
          devOptions: {
            enabled: true
          },
          workbox: {
            clientsClaim: true,
            skipWaiting: true,
            globPatterns: ['**/*.{js,css,html,ico,png,svg}']
          },
          manifest: {
            "name": "ifc4all",
            "short_name": "ifc4all",
            "start_url": ".",
            "background_color": "#ffffff",
            "theme_color": "#ffffff",
            "display": "standalone",
            "images": [
              {
                "src": "public/grua.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "maskable"
              },
              {
                "src": "public/grua500.png",
                "sizes": "512x512",
                "type": "image/png"
              }
            ] 
          }
        }),
        comlink(),
        // comlink({ useModuleWorker: true })
    ],
  },
})