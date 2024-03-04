import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineConfig({
  integrations: [
    vue({
      appEntrypoint: '/src/pages/_app',
      template: {
        transformAssetUrls,
      },
    }),
  ],

  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
    plugins: [
      {
        name: 'vuetify-plugin',
        configResolved(config) {
          const idx_vue = config.plugins.findIndex(
            (plugin) => plugin.name && plugin.name === 'vite:vue'
          )
          //@ts-ignore
          config.plugins.splice(
            idx_vue + 1,
            0,
            Vuetify({
              autoImport: true,
            })[0]
          )
        },
      },
    ],
  },
})
