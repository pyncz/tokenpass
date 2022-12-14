import type { MaybeRef } from '@vueuse/core'
import type { Contract } from 'ethers'
import type { MaybePromise, Nullable } from '@voire/type-utils'
import type { HexString, IJsonRpcProvider } from '../models'

export function useContractMetadata<
  TMetadata extends Record<string, any> = Record<string, any>,
>(
  address: MaybeRef<Nullable<HexString>>,
  provider: MaybeRef<Nullable<IJsonRpcProvider>>,
  abi: MaybeRef<Nullable<any>>,

  getter: (contract: Contract) => MaybePromise<TMetadata>,
  defaultMetadata: TMetadata,
) {
  const evaluating = ref(false)
  const contract = useContract(address, provider, abi)

  const metadata = computedAsync<TMetadata>(
    async () => {
      if (contract.value) {
        try {
          return await getter(contract.value)
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
