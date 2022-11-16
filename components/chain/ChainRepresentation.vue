<template>
  <div class="chain">
    <div class="chain-icon-group" :class="{ test: !!chainInfo?.test }">
      <chain-icon class="chain-icon" :chain-id="chainIntId" />
      <span class="test-mark" :title="$t('tooltips.test')" />
    </div>
    <span class="tw-text-7/8 tw-truncate tw-flex-1 tw-text-dim-1 tw-font-mono">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import type { ChainID } from '~~/models'

const props = defineProps<{
  chainId: ChainID
}>()

const chainId = toRef(props, 'chainId')
const { chainInfo, intId: chainIntId, hexId: chainHexId } = useChainById(chainId)

const label = computed(() => chainInfo.value?.label ?? chainHexId.value)
</script>

<style scoped lang="scss">
  .chain {
    @apply tw-flex-center-y tw-gap-1.5;
    &-icon {
      @apply tw-text-5/4 tw-relative;
    }
    &-icon-group {
      @apply tw-relative tw--top-px;
      .test-mark {
        @apply tw-hidden;
        @apply tw-circle-2 tw-bg-test tw-absolute tw--right-0.5 tw--bottom-0.5;
      }
      &.test {
        .chain-icon {
          mask-image: radial-gradient(0.375rem 0.375rem at calc(100% - 0.125rem) calc(100% - 0.125rem), transparent 100%, black 100%);
        }
        .test-mark {
          @apply tw-inline-flex;
        }
      }
    }
  }
</style>
