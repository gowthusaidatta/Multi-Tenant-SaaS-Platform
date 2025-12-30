/**
 * Vite Configuration for Frontend Build
 * Configures React plugin and build settings
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  // Enable React Fast Refresh
  plugins: [react()],
  
  // Project root directory
  root: path.resolve(__dirname),
  
  // Development server configuration
  server: {
    middlewareMode: true
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: false  // Disable source maps for production
  }
})
