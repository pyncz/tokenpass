import type { Nullable } from '@voire/type-utils'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import type { CheckOwnershipResults } from '../models'
import { useConnectionStore } from './connection'
import { useSetupStore } from './setup'

export const useCheckingStore = defineStore('checking', () => {
  const { address } = storeToRefs(useConnectionStore())

  const {
    setupState,
    contract,
    isIERC20,
    isIERC721,
    isIERC1155,
  } = storeToRefs(useSetupStore())

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

  const result = ref<Nullable<CheckOwnershipResults>>(null)
  const {
    decoratedMethod: check,
    loading: checkingOwnership,
  } = useLoading(async () => {
    // Go checking, if got address and already know what token it is
    if (contract.value && address.value) {
      switch (true) {
        case isIERC20.value: {
          const balance = await contract.value.balanceOf(address.value)
          result.value = makeResult(balance)
          return
        }
        case isIERC721.value: {
          if (tokenId.value) {
            // check the token's owner and compare addresses
            const ownerOf = await contract.value.ownerOf(tokenId.value)
            result.value = makeResult(ownerOf === address.value ? 1 : 0)
          } else {
            // just check the balance
            const balance = await contract.value.balanceOf(address.value)
            result.value = makeResult(balance)
          }
          return
        }
        case isIERC1155.value: {
          // `tokenId` is required for ERC-1155!
          if (tokenId.value) {
            const balance = await contract.value.balanceOf(address.value, tokenId.value)
            result.value = makeResult(balance)
          }
          return
        }
      }
    }
    result.value = null
  })

  const canCheck = computed(() => !!address.value && !!contract.value)
  watch(canCheck, () => {
    if (address.value && contract.value) {
      check()
    } else {
      result.value = null
    }
  }, { immediate: true })

  const checking = computed(() => checkingOwnership.value || (address.value && !contract.value))

  return {
    checking,
    result,

    check,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCheckingStore, import.meta.hot))
}
