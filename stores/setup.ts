import type { Nullable } from '@voire/type-utils'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { SetupForm } from '../models'

export const useSetupStore = defineStore('setup', () => {
  const setupState = useLocalStorage<Nullable<SetupForm>>('setup', null)

  const setSetupState = (form: Nullable<SetupForm>): void => {
    setupState.value = form
  }

  const resetSetupState = () => setSetupState(null)

  return { setupState, setSetupState, resetSetupState }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSetupStore, import.meta.hot))
}
