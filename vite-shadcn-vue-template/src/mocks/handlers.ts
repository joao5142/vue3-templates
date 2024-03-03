import { HttpResponse, http } from 'msw'

import { BASE_URL_API } from '@/lib/api'

export const handlers = [
  http.get(BASE_URL_API + '/test', () => {
    return HttpResponse.json({})
  }),
]
