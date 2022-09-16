import {defineConfig} from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "../application/src/main/resources/static/",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name][extname]",
        chunkFileNames: "assets/[name].js",
        entryFileNames: "assets/[name].js"
      }
    }
  },
  server: {
    host: '0.0.0.0',
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
      },
      '/page': {
        target: 'https://cloud.erppre.com',
        secure: false,
        changeOrigin: true,
        rewrite: path => path
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd-mobile',
          style: () => false,
          libDirectory: 'es/components',
          replaceOldImport: true
        }
      ]
    })
  ]
})
