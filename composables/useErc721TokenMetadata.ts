import type { MaybeRef } from '@vueuse/core'
import type { providers } from 'ethers'
import type { Nullable } from '@voire/type-utils'
import type { HexString } from '../models'
import { IERC721MetadataAbi, callWithFallback } from '../utils'
import { useTokenMetadata } from './useTokenMetadata'

export function useErc721TokenMetadata(
  address: MaybeRef<Nullable<HexString>>,
  provider: MaybeRef<Nullable<providers.JsonRpcProvider>>,
  tokenId: MaybeRef<Nullable<string | number>>,
) {
  return useTokenMetadata(
    address,
    provider,
    tokenId,
    IERC721MetadataAbi,
    (contract, id) => callWithFallback<string>(() => contract.tokenURI(id)),
  )
}
