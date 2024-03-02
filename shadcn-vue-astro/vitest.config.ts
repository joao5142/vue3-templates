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
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
