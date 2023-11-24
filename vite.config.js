import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'
import { manifestConfig } from './pwa.config'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.REPO_NAME ? `/${process.env.REPO_NAME}/` : '/', // Set base dynamically for github pages
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'apple-touch-icon.png',
        'mask-icon.svg',
        'screenshot1.png',
        'screenshot2.png'
      ],
      manifest: manifestConfig
    })
  ]
})
