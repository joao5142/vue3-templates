export function isDocumentScrollInFinal(callback: () => void) {
  const documentHeight = document.body.scrollHeight
  const currentScroll = window.scrollY + window.innerHeight

  const differenceToFinalScroll = 200
  if (currentScroll + differenceToFinalScroll > documentHeight) {
    callback()
  }
}
