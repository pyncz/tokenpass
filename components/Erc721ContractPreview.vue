<template>
  <contract-preview type="ERC-721" :evaluating="evaluating">
    <div class="tw-flex-center-y tw-gap-1.5">
      <icon name="💎" class="tw-text-accent-secondary" />
      <contract-preview-title :symbol="symbol" :name="name" />
    </div>
  </contract-preview>
</template>

<script setup lang="ts">
import { toRefs as refToRefs } from '@vueuse/core'
import type { ChainID, HexString } from '../models'

interface Props {
  chainId?: ChainID
  address: HexString
}

const props = withDefaults(defineProps<Props>(), {
  chainId: '0x1',
})

const { chainId, address } = toRefs(props)

const {
  evaluating,
  metadata,
} = useErc721Metadata(address, useInfuraProvider(chainId))

const { symbol, name } = refToRefs(metadata)
</script>
