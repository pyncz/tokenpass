import type { Nullable } from '@voire/type-utils'
import { acceptHMRUpdate, defineStore, skipHydrate } from 'pinia'
import type { SetupState } from '../models'
import { ERC1155Abi, ERC20Abi, ERC721Abi } from '../utils'

export const useSetupStore = defineStore('setup', () => {
  /**
   * Manage setup form
   */
  const setupState = useLocalStorage<Nullable<SetupState>>('setup', null, {
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

  /**
   * Configured contract's info
   */
  const chainId = computed(() => setupState.value?.chainId ?? null)
  const contractAddress = computed(() => setupState.value?.address ?? null)

  const provider = useRpcProvider(chainId)

  // As soon as the address is known, check if the accountt owns the token
  const interfacesFlags = useContractInterfaces(contractAddress, provider)

  const contractAbi = computed(() => {
    switch (true) {
      case interfacesFlags.isIERC20.value:
        return ERC20Abi
      case interfacesFlags.isIERC721.value:
        return ERC721Abi
      case interfacesFlags.isIERC1155.value:
        return ERC1155Abi
      default:
        return null
    }
  })

  const contract = useContract(contractAddress, provider, contractAbi)

  return {
    // Skip hydration from init state
    // as need to init only on the client side from localStorage
    setupState: skipHydrate(setupState),

    setSetupState,
    reset,

    contract,
    ...interfacesFlags,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSetupStore, import.meta.hot))
}
