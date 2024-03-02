import { USER_COLLECTION, USER_PERFIL_THEME_COLLECTION, USER_THEME_COLLECTION } from '@/storage'

const collectionStoredName = `${USER_COLLECTION}`

export async function createNewUser(user: any) {
  try {
    await localStorage.setItem(collectionStoredName, user)
  } catch (error) {
    throw error
  }
}

export function getStoredUser() {
  try {
    const user = localStorage.getItem(collectionStoredName) || []

    return user
  } catch (error) {
    throw error
  }
}

export function getUserTheme() {
  try {
    const theme = JSON.parse(localStorage.getItem(USER_THEME_COLLECTION) || '')

    if (!theme) {
      return 'light'
    }
    return theme
  } catch (err) {
    return 'light'
  }
}

export function setUserTheme(value: unknown) {
  const theme = localStorage.setItem(USER_THEME_COLLECTION, JSON.stringify(value))

  return theme
}

export function getUserPerfilTheme(): string {
  const theme = JSON.parse(localStorage.getItem(USER_PERFIL_THEME_COLLECTION)!)

  if (!theme) {
    return 'linear-gradient(90deg, #99CED5 0%, #FFD4BF 100%)'
  }

  return theme
}

export function setUserPerfilTheme(value: unknown) {
  const theme = localStorage.setItem(USER_PERFIL_THEME_COLLECTION, JSON.stringify(value))

  return theme
}
