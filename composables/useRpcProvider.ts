import type { MaybeRef } from '@vueuse/core'
import type { Nullable } from '@voire/type-utils'
import type { ChainID } from '../models'
import { JsonRpcProvider } from '../models'
import { chainInfoMap } from '../utils'

export function useRpcProvider(
  chainId: MaybeRef<Nullable<ChainID>>,
) {
  const { INFURA_PROJECT_ID } = useRuntimeConfig()

  const provider = computed(() => {
    const chainIdValue = unref(chainId)
    if (chainIdValue) {
      const { rpcDomain } = chainInfoMap[chainIdValue] ?? {}
      if (rpcDomain) {
        return new JsonRpcProvider(
          `https://${rpcDomain}.infura.io/v3/${INFURA_PROJECT_ID}`,
          +chainIdValue,
        )
      }
    }

    return null
  })

  return provider
}
