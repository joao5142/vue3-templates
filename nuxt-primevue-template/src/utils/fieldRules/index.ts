import {
  isEmailValid,
  min8Characters,
  uppercaseCharacters,
  lowercaseCharacters,
  specialCharacters,
} from '@/utils/regex'

export const emptyValue = (value: string) => {
  if (value) {
    return true
  }

  return 'Preencha o campo'
}

export const isEmail = (value: string) => {
  if (value.match(isEmailValid)) {
    return true
  }

  return 'O campo não é um email válido'
}

// export const isPhoneNumber = (value: string) => {
//   if (value.match(isPhoneNumberRegex)) {
//     return true
//   }

//   return 'O campo não é um número válido'
// }

export const passwordRulesArray = [
  (value: string) => {
    if (value.match(min8Characters)) {
      return true
    } else {
      return 'Mínimo de 8 caracteres'
    }
  },
  (value: string) => {
    if (value.match(uppercaseCharacters)) {
      return true
    } else {
      return 'Digite ao menos uma letra maiúscula'
    }
  },

  (value: string) => {
    if (value.match(lowercaseCharacters)) {
      return true
    } else {
      return 'Digite ao menos uma letra minúscula'
    }
  },

  (value: string) => {
    if (value.match(specialCharacters)) {
      return true
    } else {
      return 'Digite algum caractere especial'
    }
  },
]
