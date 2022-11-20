import type { MaybeRef } from '@vueuse/core'
import { providers } from 'ethers'
import type { Nullable } from '@voire/type-utils'
import type { ChainID } from '../models'

const { InfuraProvider } = providers

export function useInfuraProvider(
  chainId: MaybeRef<Nullable<ChainID>>,
) {
  const { INFURA_PROJECT_ID } = useRuntimeConfig()

  const provider = computed(() => {
    const chainIdValue = unref(chainId)
    if (chainIdValue) {
      return new InfuraProvider(
        +chainIdValue,
        INFURA_PROJECT_ID,
      )
    }

    return null
  })

  return provider
}
