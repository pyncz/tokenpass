import type { Nullable } from '@voire/type-utils'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { ERC1155Abi, ERC20Abi, ERC721Abi } from '../utils'
import { useConnectionStore } from './connection'
import { useSetupStore } from './setup'

interface CheckOwnershipResults {
  required: number
  balance: number
  passed: boolean
  tokenId?: Nullable<number>
}

export const useCheckingStore = defineStore('checking', () => {
  const { setupState } = storeToRefs(useSetupStore())
  const { address } = storeToRefs(useConnectionStore())

  const chainId = computed(() => setupState.value?.chainId ?? null)
  const contractAddress = computed(() => setupState.value?.address ?? null)
  const amount = computed(() => setupState.value?.amount ?? null)
  const tokenId = computed(() => setupState.value?.tokenId ?? null)

  const provider = useInfuraProvider(chainId)

  // As soon as the address is known, check if the accountt ownes the token
  const checkingOwnership = ref(false)
  const {
    isIERC20,
    isIERC721,
    isIERC1155,
  } = useContractInterfaces(address, provider)

  const contractAbi = computed(() => {
    switch (true) {
      case isIERC20.value:
        return ERC20Abi
      case isIERC721.value:
        return ERC721Abi
      case isIERC1155.value:
        return ERC1155Abi
      default:
        return null
    }
  })

  const contract = useContract(contractAddress, provider, contractAbi)

  const makeResult = (balance: number): CheckOwnershipResults => {
    const required = amount.value ?? 1
    return {
      required,
      balance,
      passed: balance >= required,
      tokenId: tokenId.value,
    }
  }

  const result = computedAsync<Nullable<CheckOwnershipResults>>(
    async () => {
      // Go checking, if got address and already know what token it is
      if (contract.value && address.value) {
        switch (true) {
          case isIERC20.value: {
            const balance = await contract.value.balanceOf(address.value)
            return makeResult(balance)
          }
          case isIERC721.value: {
            if (tokenId.value) {
              // check the token's owner and compare addresses
              const ownerOf = await contract.value.ownerOf(tokenId.value)
              return makeResult(ownerOf === address.value ? 1 : 0)
            } else {
              // just check the balance
              const balance = await contract.value.balanceOf(address.value)
              return makeResult(balance)
            }
          }
          case isIERC1155.value: {
            // `tokenId` is required for ERC-1155!
            if (tokenId.value) {
              const balance = await contract.value.balanceOf(address.value, tokenId.value)
              return makeResult(balance)
            }
            return null
          }
          default:
            return null
        }
      }
      return null
    },
    null,
    {
      evaluating: checkingOwnership,
    },
  )

  const checking = computed(() => checkingOwnership.value || (address.value && !contract.value))

  return {
    checking,
    result,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCheckingStore, import.meta.hot))
}
