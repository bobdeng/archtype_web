import path from 'path'
import {configDefaults, defineConfig} from 'vitest/config'
import vitejsConfig from './vite.config'

export default defineConfig({
  ...vitejsConfig,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'test/test.setup.ts',
    exclude: [
      ...configDefaults.exclude,
      'packages/template/*',
      '**/node_modules/**'
    ],
    include: [
      'test/unit/**/*.test.{ts,tsx,js,jsx}',
      'src/**/*.{test,spec}.{ts,tsx,js,jsx}'
    ],
    coverage: {
      provider: "istanbul",
      exclude: [
        '**/components/components.*',
        '**/api/HttpServer.ts',
        "src/**/*.{test,spec}.{ts,tsx,js,jsx}",
        'test/*'
      ]
    }
  }
})
