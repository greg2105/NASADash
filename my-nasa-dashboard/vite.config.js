import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: false, // Disable CSS modules
  },
  server: {
    mime: {
      '.jsx': 'text/jsx',
    },
    proxy: {
      '/api': {
        target: 'https://eonet.sci.gsfc.nasa.gov/api/v3',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});