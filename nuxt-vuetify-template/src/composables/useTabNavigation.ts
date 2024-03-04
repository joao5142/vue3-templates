export function useTabNavigation() {
  const selectedTab = ref<number>(0)

  function handleSetTabToQueryParams() {
    const parameters = new URLSearchParams(window.location.search)

    parameters.set('tab', String(selectedTab.value))

    history.replaceState(null, '', '?' + parameters.toString())
  }

  function setQueryParamTabToSelectedNavigationTab() {
    if (typeof window !== 'undefined') {
      const parameters = new URLSearchParams(window.location.search)
      const tab = parameters.get('tab') ?? 0
      console.log(tab)
      if (tab) {
        selectedTab.value = Number(tab)
      }
    }
  }

  return { handleSetTabToQueryParams, setQueryParamTabToSelectedNavigationTab, selectedTab }
}
