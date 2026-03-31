import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.unit.{ts,tsx}', '**/*.integration.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/e2e/**'],
    setupFiles: ['./vitest.setup.ts'],
  },
})
