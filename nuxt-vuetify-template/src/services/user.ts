const { $api } = useNuxtApp()
class User {
  static auth(): Promise<void> {
    return Promise.resolve()
  }

  static async getAuthenticatedUser() {
    const response = await $api('/user', {
      method: 'get',
    })

    return response
  }

  static async findOne(id: number) {
    const response = await $api(`/user/${id}`, {
      method: 'get',
    })

    return response
  }
}
