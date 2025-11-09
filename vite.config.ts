import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// Plugin to remove crossorigin attribute from HTML for GitHub Pages compatibility
function removeCrossorigin() {
  return {
    name: 'remove-crossorigin',
    closeBundle() {
      const htmlPath = join(__dirname, 'dist', 'index.html')
      try {
        let html = readFileSync(htmlPath, 'utf-8')
        // Remove crossorigin attribute from script and link tags
        html = html.replace(/\s+crossorigin/g, '')
        writeFileSync(htmlPath, html, 'utf-8')
      } catch (error) {
        console.warn('Could not modify HTML file:', error)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), removeCrossorigin()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Ensure proper file extensions for GitHub Pages
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) {
            return `assets/[name]-[hash][extname]`
          }
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/img/[name]-[hash][extname]`
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
      },
    },
  },
})