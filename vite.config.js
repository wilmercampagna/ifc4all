import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
// import { comlink } from 'vite-plugin-comlink'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA(
      {
      registerType: "autoUpdate",
      // injectRegister: 'auto',      
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm}'],
        clientsClaim: true,
        skipWaiting: true,
        sourcemap: true,
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
            }
          },
          {
            handler: 'NetworkOnly',
            urlPattern: /\/api\/.*\/*.json/,
            method: 'POST',
            options: {
              backgroundSync: {
                name: 'myQueueName',
                options: {
                  maxRetentionTime: 24 * 60
                }
              }
            }
          },
        ]
      },
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
          "display_override": [
            "window-controls-overlay",
            "standalone",
            "browser",
            "side_panel"
          ],
          "side_panel": {
            "preferred_width": 600
          },
          "handle_links": "auto",
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
          "screenshots" : [
            {
              "src": "screenshot.png",
              "sizes": "1442x764",
              "type": "image/png",
              "platform": "wide",
            }
          ],
        }
      }
    ),
    // comlink(),
    // legacy({
    //   targets: ["defaults", "not IE 11"],
    // }),
  ],
  base: "https://wilmercampagna.github.io/ifc4all",
  // worker: {
  //   plugins: [      
  //     comlink(),
  //     // comlink({ useModuleWorker: true })
  //   ],
  // },
});