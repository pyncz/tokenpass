import { acceptHMRUpdate, defineStore } from 'pinia'

export const useNavStore = defineStore('nav', () => {
  const links = ref([
    { key: 'about', path: '/about' },
    { key: 'settings', path: '/settings' },
  ])

  return { links }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNavStore, import.meta.hot))
}
