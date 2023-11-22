import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from "vite-plugin-pwa";
import { manifestConfig } from "./pwa.config"


// https://vitejs.dev/config/
export default defineConfig({
  base: '/sveltepwa/', //this allow you to deploy to github pages, you may delete this line if your project is root level domain
  plugins: [
    svelte(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: manifestConfig
    }),
  ],
});
