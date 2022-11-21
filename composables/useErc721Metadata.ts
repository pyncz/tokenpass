import type { MaybeRef } from '@vueuse/core'
import type { providers } from 'ethers'
import type { Nullable } from '@voire/type-utils'
import type { HexString } from '../models'
import { IERC721MetadataAbi, callWithFallback } from '../utils'
import { useContractMetadata } from './useContractMetadata'

interface Erc721Metadata {
  name: Nullable<string>
  symbol: Nullable<string>
}

export function useErc721Metadata(
  address: MaybeRef<Nullable<HexString>>,
  provider: MaybeRef<Nullable<providers.InfuraProvider>>,
) {
  return useContractMetadata<Erc721Metadata>(
    address,
    provider,
    IERC721MetadataAbi,
    async contract => ({
      symbol: await callWithFallback<string>(contract.value.symbol),
      name: await callWithFallback<string>(contract.value.name),
    }),
    {
      name: null,
      symbol: null,
    },
  )
}
