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
        <lazy-a-link v-if="metadata.external_url" blank :href="metadata.external_url" />
      </span>
    </div>
  </with-skeleton>
</template>

<script setup lang="ts">
import type { ChainID, HexString } from '../models'

interface Props {
  chainId?: ChainID
  address: HexString
  tokenId?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  chainId: '0x1',
  tokenId: 1,
})

const { chainId, address, tokenId } = toRefs(props)
const provider = useInfuraProvider(chainId)

const {
  evaluating,
  metadata,
} = useErc721TokenMetadata(address, provider, tokenId)
</script>
