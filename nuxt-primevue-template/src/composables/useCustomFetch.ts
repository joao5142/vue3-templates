import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'
import { apiDefaultConfig } from '@/lib/api/config'

export function useCustomFetch<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  const token = useCookie(apiDefaultConfig.userTokenName)

  const config = useRuntimeConfig()

  const defaults: UseFetchOptions<T> = {
    baseURL: (config.baseUrl as string) ?? apiDefaultConfig.baseUrl,

    headers: token ? { Authorization: `Bearer ${token}` } : {},

    onResponse(_ctx) {},

    onResponseError(_ctx) {},
  }

  const params = defu(options, defaults)

  return useFetch(url, params)
}
