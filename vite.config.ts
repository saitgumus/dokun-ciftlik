import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

/** GitHub Pages project site: https://saitgumus.github.io/dokun-ciftlik/ */
const base = '/dokun-ciftlik/'

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.svg'],
      manifest: {
        name: 'Dokun — Çiftlik',
        short_name: 'Dokun',
        description: 'Dokun-dinle tarzı interaktif çocuk kitabı: çiftlik sahnesi',
        theme_color: '#7eb8d4',
        background_color: '#c8e4f0',
        display: 'standalone',
        orientation: 'any',
        lang: 'tr',
        start_url: base,
        scope: base,
        icons: [
          {
            src: 'icons/icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'icons/icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,json,ico,woff2}'],
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
  },
})
