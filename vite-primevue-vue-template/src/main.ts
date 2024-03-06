import './styles/base.css'

import PrimeVue from 'primevue/config'
import Tailwind from 'primevue/passthrough/tailwind'

import { createApp } from 'vue'

import App from './App.vue'

import router from '@/routes'
import { createPinia } from 'pinia'

import { worker } from './mocks/broswer'

async function prepareApp() {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return worker.start()
  }

  return Promise.resolve()
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { unstyled: true, pt: Tailwind })
prepareApp().then(() => {
  app.mount('#app')
})
