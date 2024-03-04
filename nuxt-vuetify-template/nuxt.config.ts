import { NuxtPage } from 'nuxt/schema'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  srcDir: 'src/',
  ssr: true,

  app: {
    head: {
      title: 'Nuxt App',
      link: [
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
        },
      ],
    },
  },

  hooks: {
    'pages:extend'(pages) {
      // remove @components and @types from router matching inside pages folder
      function acceptPagesMatching(pages: NuxtPage[] = []) {
        const pagesToRemove = []
        for (const page of pages) {
          if (page.path.includes('@components') || page.path.includes('@types')) {
            pagesToRemove.push(page)
          } else {
            acceptPagesMatching(page.children)
          }
        }
        for (const page of pagesToRemove) {
          pages.splice(pages.indexOf(page), 1)
        }
      }
      acceptPagesMatching(pages)
    },
  },

  build: {
    transpile: ['vuetify'],
  },

  components: [
    {
      global: true,
      path: '@/components/ui',
      pathPrefix: false,
    },
    { global: true, path: '@/components/partials', pathPrefix: false },
  ],

  css: ['vuetify/styles', '@/styles/global.scss'],

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(
          vuetify({
            autoImport: true,
            // FIXME: Vuetify issue if enabled: Sourcemap for "plugin-vuetify:components/VComponent/VComponent.sass" points to missing source files or another error
            // styles: { configFile: resolve('./styles/_settings.scss') },
          })
        )
      })
    },
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/web-vitals',
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  // third party librarys setup configuration
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },

  webVitals: {
    provider: 'log',
    debug: true,
    disabled: false,
  },

  i18n: {
    strategy: 'no_prefix',
    langDir: './lang/locales',
    locales: [
      {
        code: 'pt-BR',
        iso: 'pt-BR',
        name: 'Português(Brasil)',
        file: 'pt-BR.json',
      },
      {
        code: 'en-US',
        iso: 'en-US',
        name: 'English(US)',
        file: 'en-US.json',
      },
      {
        code: 'es-ES',
        iso: 'es-ES',
        name: 'Español',
        file: 'es-ES.json',
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
    },
    defaultLocale: 'pt-BR',
  },
})
