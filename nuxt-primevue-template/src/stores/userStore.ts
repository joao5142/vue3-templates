import { AxiosError } from 'axios'
import { USER_COLLECTION } from '@/storage'

import { User } from '@/mocks'
import { IUser } from '@/types/globals/user'

import api from '@/lib/api'

export const useUserStore = defineStore('user', () => {
  const token = ref()

  const userState = ref<{ user: IUser }>({ user: { ...User } })

  if (typeof window !== 'undefined') {
    try {
      const user: null | IUser = JSON.parse(localStorage.getItem(USER_COLLECTION)!)

      if (user) {
        userState.value.user = user
      } else {
        userState.value.user = User
      }
    } catch (err) {
      console.error(err)
    }
  }

  function setToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
    token.value = tokenValue
  }

  function setUser(userValue: any) {
    localStorage.setItem(USER_COLLECTION, JSON.stringify(userValue))
    userState.value.user = userValue
  }

  async function checkToken() {
    try {
      const tokenBearer = 'Bearer ' + token.value
      const response = await api.get('/verify-token', {
        headers: {
          Authorization: tokenBearer,
        },
      })

      if (response.status === 200 && response.data.status) {
        setUser(response.data.decode)

        return true
      }
    } catch (error) {
      const err = error as AxiosError

      console.error(err)

      return false
    }
  }

  function logoutApp() {
    const REDIRECT_URL = import.meta.env.VITE_FUND1_URL

    localStorage.removeItem('token')
    localStorage.removeItem(USER_COLLECTION)

    token.value = ''

    // Redirecione o usuário para o login
    window.location.replace(REDIRECT_URL)
    // await router.replace('/')
  }

  return {
    token,
    user: userState.value.user,
    setToken,
    setUser,
    checkToken,
    logoutApp,
  }
})
