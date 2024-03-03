import httpClient from '@/lib/api'
import { BASE_URL_API } from '@/lib/api'

export class TestService {
  static async getAll(): Promise<unknown> {
    const products = await httpClient.get(BASE_URL_API + '/test')

    return products.data
  }

   
}
