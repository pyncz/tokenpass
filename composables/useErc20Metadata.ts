import type { MaybeRef } from '@vueuse/core'
import type { Nullable } from '@voire/type-utils'
import type { HexString, IJsonRpcProvider } from '../models'
import { ERC20Abi, callWithFallback } from '../utils'
import { useContractMetadata } from './useContractMetadata'

interface Erc20Metadata {
  name: Nullable<string>
  symbol: Nullable<string>
  decimals: Nullable<number>
}

export function useErc20Metadata(
  address: MaybeRef<Nullable<HexString>>,
  provider: MaybeRef<Nullable<IJsonRpcProvider>>,
) {
  return useContractMetadata<Erc20Metadata>(
    address,
    provider,
    ERC20Abi,
    async contract => ({
      name: await callWithFallback<string>(contract.name),
      symbol: await callWithFallback<string>(contract.symbol),
      decimals: await callWithFallback<number>(contract.decimals),
    }),
    {
      name: null,
      symbol: null,
      decimals: null,
    },
  )
}
