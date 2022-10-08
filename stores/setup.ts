import type { Nullable } from '@voire/type-utils'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { SetupForm } from '~~/models'

export const useSetupStore = defineStore('setup', () => {
  const setupForm = useLocalStorage<Nullable<SetupForm>>('setup', null)

  const setSetupForm = (form: Nullable<SetupForm>): void => {
    setupForm.value = form
  }

  return { setupForm, setSetupForm }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSetupStore, import.meta.hot))
}
