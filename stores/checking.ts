import type { Nullable } from '@voire/type-utils'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { useConnectionStore } from './connection'
import { useContractStore } from './contract'
import { useSetupStore } from './setup'

interface CheckOwnershipResults {
  required: number
  balance: number
  passed: boolean
  tokenId?: Nullable<number>
}

export const useCheckingStore = defineStore('checking', () => {
  const { address } = storeToRefs(useConnectionStore())

  const { setupState } = storeToRefs(useSetupStore())
  const {
    contract,
    isIERC20,
    isIERC721,
    isIERC1155,
  } = storeToRefs(useContractStore())

  const amount = computed(() => setupState.value?.amount ?? null)
  const tokenId = computed(() => setupState.value?.tokenId ?? null)

  const makeResult = (balance: number): CheckOwnershipResults => {
    const required = amount.value ?? 1
    return {
      required,
      balance,
      passed: balance >= required,
      tokenId: tokenId.value,
    }
  }

  const checkingOwnership = ref(false)

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
