<template>
  <div v-if="collectionMeta" class="collection">
    <icon name="gem" class="tw-text-accent-secondary" />
    <span class="tw-text-7/8 tw-truncate tw-flex-1 tw-text-dim-1 tw-font-mono">
      {{ collectionMeta.name ?? address }}
    </span>
  </div>
  <p v-else-if="!evaluating" class="tw-warning">
    {{ $t('errors.noCollection') }}
  </p>
</template>

<script setup lang="ts">
import type { HexString } from '~~/models'
import { useNftStore } from '~~/stores'

interface Props {
  chainId?: HexString
  address: string
}
const props = withDefaults(defineProps<Props>(), {
  chainId: '0x1',
})

const { chainId, address } = toRefs(props)
const evaluating = ref(false)

const collectionMeta = computedAsync(async (onCancel) => {
  const abortController = new AbortController()
  const abortSignal = abortController.signal

  onCancel(() => abortController.abort())

  return useNftStore().getCollectionMeta(address.value, {
    chainId: chainId.value,
    abortSignal,
  })
}, null, evaluating)
</script>

<style scoped lang="scss">
  .collection {
    @apply tw-flex tw-gap-1.5;
  }
</style>
