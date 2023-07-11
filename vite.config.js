import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import { comlink } from 'vite-plugin-comlink'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest:
        {
          "name": "ifc4all",
          "id": "/ifc4all/",
          "short_name": "ifc4all",
          "start_url": ".",
          "background_color": "#ffffff",
          "theme_color": "#ffffff",
          "display": "standalone",
          "icons": [
            {
              "src": "logo192.png",
              "sizes": "192x192",
              "type": "image/png",
              "purpose": "maskable"
            },
            {
              "src": "logo256.png",
              "sizes": "256x256",
              "type": "image/png"
            },
            {
              "src": "logo512.png",
              "sizes": "512x512",
              "type": "image/png",
              "purpose": "any"
            }
          ],
          "description": "This is a free VR viewer, has been developed with threejs and ifcjs to read ifc files and rederize them in the VR World.",
          "orientation": "portrait-primary",
          "dir": "auto",
          "lang": "en-US",
          "categories": [
            "education",
            "navigation",
            "productivity",
            "construction"
          ],
        }
      }
    ),
    comlink(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  base: "https://wilmercampagna.github.io/ifc4all",
  worker: {
    plugins: [      
      comlink(),
      // comlink({ useModuleWorker: true })
    ],
  },
});