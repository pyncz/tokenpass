<template>
  <with-skeleton :evaluating="evaluating">
    <div class="tw-flex-center-y tw-gap-1.5">
      <icon name="🪙" size="auto" />
      <contract-preview :symbol="symbol" :name="name" />
    </div>
  </with-skeleton>
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
} = useErc20Metadata(address, useInfuraProvider(chainId))

const { symbol, name } = refToRefs(metadata)
</script>
