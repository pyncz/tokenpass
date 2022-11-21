<template>
  <contract-preview type="ERC-20" :evaluating="evaluating">
    <contract-preview-title :symbol="symbol" :name="name" />
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
} = useErc20Metadata(address, useInfuraProvider(chainId))

const { symbol, name } = refToRefs(metadata)
</script>
