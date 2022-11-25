<template>
  <lib-button
    ref="button"
    class="tw-relative tw-text-dim-2 tw-flex tw-button-secondary tw-h-auto tw-text-lg sm:tw-text-normal tw-p-[0.5em]"
    :style="{ width }"
    @click="copy()"
  >
    <div class="tw-flex">
      <div class="tw-absolute tw--left-0.5 tw-top-1/2 tw--translate-y-1/2 tw-inline-flex tw-p-1 tw-rounded tw-bg-dim-2">
        <icon name="copy" />
      </div>
      <span class="tw-truncate tw-flex-1 tw-pl-[2.125em] tw-text-7/8">
        <slot>{{ message }}</slot>
      </span>
    </div>
  </lib-button>
</template>

<script setup lang="ts">
import type { Nullable } from '@voire/type-utils'
import type { WatchStopHandle } from 'vue'
import LibButton from './lib/Button.vue'

const props = defineProps<{
  value: string
  defaultMessage?: string
  copiedMessage?: string
}>()

const button = ref<Nullable<InstanceType<typeof LibButton>>>(null)
const { value, defaultMessage, copiedMessage } = toRefs(props)

const { copy, message, justCopied } = useCopy(value, {
  defaultMessage,
  copiedMessage,
})

// Sync width of the button in the not-just-copied state
const fixedWidth = ref<Nullable<number>>(null)
const width = computed(() => fixedWidth.value ? `${fixedWidth.value}px` : undefined)

let stop: Nullable<WatchStopHandle> = null

const resetStop = () => {
  if (stop) {
    stop()
    stop = null
  }
}

const updateWidth = () => {
  fixedWidth.value = null
  nextTick(() => {
    fixedWidth.value = button.value?.$el.offsetWidth ?? null
  })
}

const syncWidth = () => {
  // remove previous watcher is exists
  resetStop()

  // try re-sync width
  if (justCopied.value) {
    // 'copied!' message is showing, hold on
    stop = whenever(
      () => !justCopied.value,
      () => {
        updateWidth()
        resetStop()
      },
      { flush: 'post' },
    )
  } else {
    updateWidth()
  }
}

onMounted(() => {
  syncWidth()
  window.addEventListener('resize', syncWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', syncWidth)
})
</script>
