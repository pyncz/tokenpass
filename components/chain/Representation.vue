<template>
  <div class="chain">
    <chain-icon class="chain-icon" :chain-id="chainIntId" />
    <span class="tw-text-7/8 tw-truncate tw-flex-1 tw-text-dim-1">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import type { ChainID } from '~~/models'

const props = defineProps<{
  chainId: ChainID
}>()

const chainId = toRef(props, 'chainId')
const { chainName, intId: chainIntId, hexId: chainHexId } = useChainById(chainId)

const label = computed(() => chainName.value ?? chainHexId.value)
</script>

<style scoped lang="scss">
  .chain {
    @apply tw-font-mono tw-flex tw-gap-1.5 tw-text-ellipsis;
    &-icon {
      @apply tw-text-5/4 tw-relative tw--top-0.5;
    }
  }
</style>
