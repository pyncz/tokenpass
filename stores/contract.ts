import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { ERC1155Abi, ERC20Abi, ERC721Abi } from '../utils'
import { useSetupStore } from './setup'

export const useContractStore = defineStore('contract', () => {
  const { setupState } = storeToRefs(useSetupStore())

  const chainId = computed(() => setupState.value?.chainId ?? null)
  const contractAddress = computed(() => setupState.value?.address ?? null)

  const provider = useInfuraProvider(chainId)

  // As soon as the address is known, check if the accountt ownes the token
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
    contract,

    ...interfacesFlags,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useContractStore, import.meta.hot))
}
