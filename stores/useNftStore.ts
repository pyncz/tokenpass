import { acceptHMRUpdate, defineStore } from 'pinia'
import { $fetch } from 'ohmyfetch'
import type { CollectionMetadata, HexString } from '../models'

export const useNftStore = defineStore('nft', () => {
  const api = $fetch.create({
    baseURL: 'https://deep-index.moralis.io/api/v2/nft/',
    headers: {
      'X-API-Key': useRuntimeConfig().public.MORALIS_API_KEY,
    },
  })

  const getCollectionMeta = async (
    address: string,
    options?: {
      chainId?: HexString
      abortSignal?: AbortSignal
    },
  ) => {
    const {
      chainId = '0x1',
      abortSignal,
    } = options ?? {}

    return api<CollectionMetadata>(`/${address}/metadata`, {
      signal: abortSignal,
      params: {
        chainId,
      },
    })
  }

  return { getCollectionMeta }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNftStore, import.meta.hot))
}
