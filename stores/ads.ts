import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAdsStore = defineStore('nav', () => {
  const ads: string[] = []

  return { ads }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdsStore, import.meta.hot))
}
