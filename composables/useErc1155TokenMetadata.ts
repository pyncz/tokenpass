import type { MaybeRef } from '@vueuse/core'
import type { providers } from 'ethers'
import type { Nullable } from '@voire/type-utils'
import type { HexString } from '../models'
import { IERC1155MetadataAbi, callWithFallback } from '../utils'
import { useTokenMetadata } from './useTokenMetadata'

export function useErc1155TokenMetadata(
  address: MaybeRef<Nullable<HexString>>,
  provider: MaybeRef<Nullable<providers.InfuraProvider>>,
  tokenId: MaybeRef<Nullable<string | number>>,
) {
  return useTokenMetadata(
    address,
    provider,
    tokenId,
    IERC1155MetadataAbi,
    (contract, id) => callWithFallback<string>(() => contract.uri(id)),
  )
}
