<template>
  <token-preview type="ERC-20" :evaluating="evaluating">
    <token-preview-title :symbol="symbol" :name="name" />
  </token-preview>
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
const provider = useInfuraProvider(chainId)

const {
  evaluating,
  metadata,
} = useErc20Metadata(address, provider)

const { symbol, name } = refToRefs(metadata)
</script>
