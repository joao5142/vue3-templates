import { getViteConfig } from 'astro/config'
import path from 'path'
import vue from '@vitejs/plugin-vue'

export default getViteConfig({
  plugins: [vue()],
  test: {
    css: false,

    globals: true,
    environment: 'jsdom',
    coverage: {
      reportsDirectory: './coverage',
    },
    setupFiles: path.resolve(__dirname, './src/tests/setup.ts'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
