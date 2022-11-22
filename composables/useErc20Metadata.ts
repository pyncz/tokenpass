import type { MaybeRef } from '@vueuse/core'
import type { providers } from 'ethers'
import type { Nullable } from '@voire/type-utils'
import type { HexString } from '../models'
import { ERC20Abi, callWithFallback } from '../utils'
import { useContractMetadata } from './useContractMetadata'

interface Erc20Metadata {
  name: Nullable<string>
  symbol: Nullable<string>
  decimals: Nullable<number>
}

export function useErc20Metadata(
  address: MaybeRef<Nullable<HexString>>,
  provider: MaybeRef<Nullable<providers.InfuraProvider>>,
) {
  return useContractMetadata<Erc20Metadata>(
    address,
    provider,
    ERC20Abi,
    async contract => ({
      name: await callWithFallback<string>(contract.value.name),
      symbol: await callWithFallback<string>(contract.value.symbol),
      decimals: await callWithFallback<number>(contract.value.decimals),
    }),
    {
      name: null,
      symbol: null,
      decimals: null,
    },
  )
}