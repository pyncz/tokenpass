import type { Nullable } from '@voire/type-utils'
import type { MaybeRef } from '@vueuse/core'
import { Contract } from 'ethers'
import type { HexString, IJsonRpcProvider } from '../models'

export function useContract(
  address: MaybeRef<Nullable<HexString>>,
  provider: MaybeRef<Nullable<IJsonRpcProvider>>,
  abi: MaybeRef<Nullable<any>>,
) {
  const contract = computed(() => {
    const addressValue = unref(address)
    const providerValue = unref(provider)
    const abiValue = unref(abi)

    if (addressValue && providerValue && abi) {
      return new Contract(addressValue, abiValue, providerValue)
    }
    return null
  })

  return contract
}
