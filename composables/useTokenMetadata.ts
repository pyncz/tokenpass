import type { MaybeRef } from '@vueuse/core'
import type { Contract, providers } from 'ethers'
import type { MaybePromise, Nullable } from '@voire/type-utils'
import { ofetch } from 'ofetch'
import type { HexString } from '../models'

export function useTokenMetadata(
  address: MaybeRef<Nullable<HexString>>,
  provider: MaybeRef<Nullable<providers.InfuraProvider>>,
  tokenId: MaybeRef<Nullable<string | number>>,
  abi: MaybeRef<Nullable<any>>,
  uriGetter: MaybeRef<(contract: Contract, tokenId: string) => MaybePromise<Nullable<string>>>,
) {
  const evaluating = ref(false)
  const contract = useContract(address, provider, abi)

  const metadata = computedAsync<Nullable<Record<string, any>>>(
    async (onCancel) => {
      const tokenIdValue = unref(tokenId)
      const contractValue = contract.value

      if (tokenIdValue && contractValue) {
        try {
          const tokenUri = await unref(uriGetter)(contractValue, tokenIdValue.toString())

          if (tokenUri) {
            const abortController = new AbortController()
            onCancel(() => abortController.abort())

            const httpUri = resolveIpfs(tokenUri)
            const tokenUriResponse = await ofetch<Record<string, any>>(httpUri, {
              signal: abortController.signal,
            })
            return resolveIpfs(tokenUriResponse) ?? null
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
