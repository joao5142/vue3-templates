import path from 'path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
    }),
    Components({
      dirs: ['./src/components'],
    }),
    vuetify({
      autoImport: true,
      // styles: { configFile: './src/styles/variables.scss' },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reportsDirectory: './coverage',
    },
    server: {
      deps: {
        inline: ['vuetify'],
      },
    },

    setupFiles: path.resolve(__dirname, './src/tests/setup.ts'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
