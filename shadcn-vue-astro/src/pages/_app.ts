import { createPinia } from 'pinia'
import '@/styles/globals.css'

import type { App } from 'vue'

export default (app: App) => {
  app.use(createPinia())
}
