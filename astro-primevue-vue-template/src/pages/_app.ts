import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Tailwind from 'primevue/passthrough/tailwind'

import '@/styles/base.css'

import type { App } from 'vue'

export default (app: App) => {
  app.use(createPinia())
  app.use(PrimeVue, { unstyled: true, pt: Tailwind })
}
