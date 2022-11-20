import type { MaybeRef } from '@vueuse/core'
import type { providers } from 'ethers'
import { Contract } from 'ethers'
import type { Nullable } from '@voire/type-utils'
import type { HexString } from '../models'
import { IERC721MetadataAbi, callWithFallback } from '~~/utils'

interface Erc721Metadata {
  name: Nullable<string>
  symbol: Nullable<string>
}

interface Erc721DetailedMetadata extends Omit<Erc721Metadata, 'tokenURI'> {}

export function useErc721Metadata(
  address: MaybeRef<Nullable<HexString>>,
  provider: MaybeRef<Nullable<providers.InfuraProvider>>,
) {
  const evaluating = ref(false)

  const defaultMetadata: Erc721DetailedMetadata = {
    name: null,
    symbol: null,
  }

  const erc721Contract = computed(() => {
    const addressValue = unref(address)
    const providerValue = unref(provider)
    if (addressValue && providerValue) {
      return new Contract(addressValue, IERC721MetadataAbi, providerValue)
    }
    return null
  })

  const metadata = computedAsync<Erc721DetailedMetadata>(
    async () => {
      if (erc721Contract.value) {
        try {
          return {
            symbol: await callWithFallback<string>(erc721Contract.value.symbol),
            name: await callWithFallback<string>(erc721Contract.value.name),
          }
        } catch (e) {}
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
