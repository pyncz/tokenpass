import type { MaybeRef } from '@vueuse/core'
import type { providers } from 'ethers'
import { Contract } from 'ethers'
import type { Nullable } from '@voire/type-utils'
import { ofetch } from 'ofetch'
import type { HexString } from '../models'
import { IERC721MetadataAbi, callWithFallback } from '../utils'

export function useErc721TokenMetadata(
  address: MaybeRef<Nullable<HexString>>,
  provider: MaybeRef<Nullable<providers.InfuraProvider>>,
  tokenId: MaybeRef<Nullable<string | number>>,
) {
  const evaluating = ref(false)

  const erc721Contract = computed(() => {
    const addressValue = unref(address)
    const providerValue = unref(provider)
    if (addressValue && providerValue) {
      return new Contract(addressValue, IERC721MetadataAbi, providerValue)
    }
    return null
  })

  const metadata = computedAsync<Nullable<Record<string, any>>>(
    async (onCancel) => {
      const tokenIdValue = unref(tokenId)
      const contract = erc721Contract.value
      if (tokenIdValue && contract) {
        try {
          const tokenUri = await callWithFallback<string>(() => contract.tokenURI(tokenIdValue.toString()))

          console.log('uri', tokenUri)

          if (tokenUri) {
            const abortController = new AbortController()
            onCancel(() => abortController.abort())

            const tokenUriResponse = await ofetch<Record<string, any>>(tokenUri, {
              signal: abortController.signal,
            })
            console.log('tokenUriResponse', tokenUriResponse, typeof tokenUriResponse)
            return tokenUriResponse ?? null
          }
        } catch (e) {}
      }
      return null
    },
    null,
    {
      evaluating,
    },
  )

  return {
    metadata,
    evaluating,
  }
}
