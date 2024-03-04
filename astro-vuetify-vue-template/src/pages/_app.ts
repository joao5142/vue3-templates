import vuetify from '@/plugins/vuetify'
import { createPinia } from 'pinia'

import type { App } from 'vue'

export default (app: App) => {
  app.use(vuetify)
  app.use(createPinia())
}
