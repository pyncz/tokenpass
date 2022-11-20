import type { MaybeRef } from '@vueuse/core'
import type { providers } from 'ethers'
import { Contract } from 'ethers'
import type { Nullable } from '@voire/type-utils'
import type { HexString } from '../models'
import { ERC20Abi, callWithFallback } from '../utils'

interface Erc20Metadata {
  name: Nullable<string>
  symbol: Nullable<string>
  decimals: Nullable<number>
}

export function useErc20Metadata(
  address: MaybeRef<Nullable<HexString>>,
  provider: MaybeRef<Nullable<providers.InfuraProvider>>,
) {
  const evaluating = ref(false)

  const defaultMetadata: Erc20Metadata = {
    name: null,
    symbol: null,
    decimals: null,
  }

  const metadata = computedAsync<Erc20Metadata>(
    async () => {
      const addressValue = unref(address)
      const providerValue = unref(provider)

      if (addressValue && providerValue) {
        const erc20Contract = new Contract(addressValue, ERC20Abi, providerValue)

        // The methods below are *optional*, so there's error possible if they're not implemented
        return {
          name: await callWithFallback<string>(erc20Contract.name),
          symbol: await callWithFallback<string>(erc20Contract.symbol),
          decimals: await callWithFallback<number>(erc20Contract.decimals),
        }
      }
      return defaultMetadata
    },
    defaultMetadata,
    {
      evaluating,
    },
  )

  return {
    metadata,
    evaluating,
  }
}
