import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // Important for Electron - use relative paths
  plugins: [react()],
  ssr: {
    noExternal: ['react-quill']
  },
  optimizeDeps: {
    include: ['react-quill']
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      // Proxying API requests to the backend
      '/api': {
        target: process.env.NODE_ENV === 'production'
          ? 'https://your-render-backend-url' // Replace with your actual Render URL
          : 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
      // Proxying WebSocket connections for socket.io
      '/socket.io': {
        target: process.env.NODE_ENV === 'production'
          ? 'https://your-render-backend-url' // Replace with your actual Render URL
          : 'http://localhost:5000',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable for production builds
  },
  define: {
    // Define environment variables for the app
    __ELECTRON__: process.env.NODE_ENV === 'electron',
  },
})
