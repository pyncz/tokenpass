import type { MaybeRef } from '@vueuse/core'
import type { providers } from 'ethers'
import type { Nullable } from '@voire/type-utils'
import type { HexString } from '../models'

export function useAddressCode(
  address: MaybeRef<Nullable<HexString>>,
  provider: MaybeRef<Nullable<providers.JsonRpcProvider>>,
) {
  const evaluating = ref(false)

  const code = computedAsync(
    () => {
      const addressValue = unref(address)
      const providerValue = unref(provider)
      if (providerValue && addressValue) {
        return providerValue.getCode(addressValue)
      }
      return null
    },
    null,
    { evaluating },
  )

  // It is a smart contract (i.e. a token), if the address stores some code
  // Otherwise it's just a regular address
  const isContract = computed(() => code.value ? code.value.length > 0 : false)

  return {
    code,
    isContract,

    evaluating,
  }
}
