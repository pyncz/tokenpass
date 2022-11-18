import type { MaybeRef } from '@vueuse/core'
import type { providers } from 'ethers'
import type { HexString } from '~~/models'

export function useAddressCode(
  address: MaybeRef<HexString>,
  provider: MaybeRef<providers.InfuraProvider>,
) {
  const evaluating = ref(false)

  const code = computedAsync(
    () => unref(provider).getCode(unref(address)),
    null,
    { evaluating },
  )

  // It is a smart contract (i.e. a token), if the address stores some code
  // Otherwise it's just a regular address
  const isContract = computed(() => code.value && code.value.length > 0)

  return {
    code,
    isContract,

    evaluating,
  }
}
