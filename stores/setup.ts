import type { Nullable } from '@voire/type-utils'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { SetupState } from '../models'

export const useSetupStore = defineStore('setup', () => {
  const setupState = useLocalStorage<Nullable<SetupState>>('setup', null)

  // The collection setup's set / reset methods
  const setSetupState = (form: Nullable<SetupState>): void => {
    setupState.value = form
  }

  const reset = () => setSetupState(null)

  return {
    setupState,
    setSetupState,

    reset,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSetupStore, import.meta.hot))
}
