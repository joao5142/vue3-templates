import { apiDefaultConfig } from '@/lib/api/config'

export default defineNuxtPlugin({
  setup() {
    const config = useRuntimeConfig()
    const token = useCookie(apiDefaultConfig.userTokenName)

    const api = $fetch.create({
      baseURL: (config.baseUrl as string) ?? apiDefaultConfig.baseUrl,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      onResponse(_ctx) {},
      onResponseError(_ctx) {},
    })

    return {
      provide: {
        api,
      },
    }
  },
})
