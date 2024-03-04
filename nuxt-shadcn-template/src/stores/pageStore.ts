export const usePageStore = defineStore('page', () => {
  const pageTitle = ref<string>('')
  const backTextName = ref<string>('')

  function setPageHeaderTitle(title: string) {
    pageTitle.value = title
  }

  function setPageBackTextName(title: string) {
    backTextName.value = title
  }

  function setPageBackTextToDefault() {
    backTextName.value = ''
  }

  return {
    pageTitle,
    setPageHeaderTitle,
    setPageBackTextName,
    backTextName,
    setPageBackTextToDefault,
  }
})
