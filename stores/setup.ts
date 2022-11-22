import type { Nullable } from '@voire/type-utils'
import { acceptHMRUpdate, defineStore, skipHydrate } from 'pinia'
import type { SetupState } from '../models'

export const useSetupStore = defineStore('setup', () => {
  const setupState = useLocalStorage<SetupState>('setup', null, {
    serializer: {
      read: (v: any) => JSON.parse(v),
      write: (v: any) => JSON.stringify(v),
    },
  })

  // The collection setup's set / reset methods
  const setSetupState = (form: Nullable<SetupState>): void => {
    setupState.value = form
  }

  const reset = () => setSetupState(null)

  return {
    setupState: skipHydrate(setupState),
    setSetupState,

    reset,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSetupStore, import.meta.hot))
}
