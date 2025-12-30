/**
 * Vitest Configuration for Frontend Testing
 * Configures test environment, coverage, and React testing utilities
 */
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  // Module resolution
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // Test configuration
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.config.js',
        'dist/',
      ],
    },
    testTimeout: 10000,
    hookTimeout: 10000,
  },
});
