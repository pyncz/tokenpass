<template>
  <with-skeleton :evaluating="evaluating">
    <div v-if="metadata" class="tw-flex-center-y tw-gap-1.5">
      <div class="tw-rounded-sm tw-overflow-hidden tw-border tw-border-separator-muted tw-flex-center tw-size-6 tw-relative">
        <img
          v-if="metadata.image"
          :src="metadata.image"
          :alt="metadata.name ?? 'NFT'"
          class="tw-absolute tw-inset-0"
        >
        <icon v-else name="gem" class="tw-text-accent-secondary" />
      </div>

      <span>
        <span v-if="metadata.name">{{ metadata.name }}</span>
        <lazy-a-link
          v-if="metadata.external_url"
          :href="metadata.external_url"
          class="!tw-border-0 tw-relative tw--top-px tw-left-0.5"
          blank
        />
      </span>
    </div>
  </with-skeleton>
</template>

<script setup lang="ts">
import type { MaybePromise, Nullable } from '@voire/type-utils'
import type { Contract } from 'ethers'
import type { ChainID, HexString } from '../models'

interface Props {
  chainId?: ChainID
  address: HexString
  tokenId?: string | number
  abi?: Nullable<any>
  uriGetter: (contract: Contract, tokenId: string) => MaybePromise<Nullable<string>>
}

const props = withDefaults(defineProps<Props>(), {
  chainId: '0x1',
  tokenId: 1,
  abi: null,
})

const { chainId, address, tokenId, abi, uriGetter } = toRefs(props)

const { evaluating, metadata } = useTokenMetadata(
  address,
  useInfuraProvider(chainId),
  tokenId,
  abi,
  uriGetter,
)
</script>
