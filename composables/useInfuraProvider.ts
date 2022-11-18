import type { MaybeRef } from '@vueuse/core'
import { providers } from 'ethers'
import type { ChainID } from '../models'

const { InfuraProvider } = providers

export function useInfuraProvider(
  chainId: MaybeRef<ChainID>,
) {
  const { INFURA_PROJECT_ID } = useRuntimeConfig()

  const provider = computed(() => {
    return new InfuraProvider(
      +unref(chainId),
      INFURA_PROJECT_ID,
    )
  })

  return provider
}
