import type { MaybeRef } from '@vueuse/core'
import type { Nullable } from '@voire/type-utils'
import type { HexString, IJsonRpcProvider } from '../models'
import { IERC721MetadataAbi, callWithFallback } from '../utils'
import { useTokenMetadata } from './useTokenMetadata'

export function useErc721TokenMetadata(
  address: MaybeRef<Nullable<HexString>>,
  provider: MaybeRef<Nullable<IJsonRpcProvider>>,
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
