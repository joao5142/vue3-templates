import { defineStore } from 'pinia'

import { USER_COLLECTION } from '@/storage'

import { User } from '@/mocks'
import { IUser } from '@/types/globals/user'

import { PerfilThemeTypes } from '@/theme'

import { getUserPerfilTheme, setUserPerfilTheme } from '@/storage/modules/user'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref()

  const userPerfilTheme = ref<PerfilThemeTypes>('linear-gradient(90deg, #99CED5 0%, #FFD4BF 100%)')

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

  async function checkToken() {}

  function logoutApp() {
    const REDIRECT_URL = import.meta.env.VITE_FUND1_URL

    localStorage.removeItem('token')
    localStorage.removeItem(USER_COLLECTION)

    token.value = ''

    // Redirecione o usuário para o login
    window.location.replace(REDIRECT_URL)
    // await router.replace('/')
  }

  function setUserChoicePerfilTheme(userChoice: PerfilThemeTypes) {
    setUserPerfilTheme(userChoice)
    userPerfilTheme.value = userChoice
  }

  function initUserPerfilTheme() {
    if (typeof window !== 'undefined') {
      try {
        const theme = getUserPerfilTheme()

        if (theme) {
          userPerfilTheme.value = theme
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  return {
    token,
    user: userState.value.user,
    setToken,
    setUser,
    checkToken,
    logoutApp,

    userPerfilTheme,
    setUserChoicePerfilTheme,
    initUserPerfilTheme,
  }
})
