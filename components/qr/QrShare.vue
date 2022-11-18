<template>
  <div class="qr-share">
    <qr-code
      :size="400"
      background="transparent"
      :foreground="foreground"
      class="tw-mx-auto tw-aspect-1 tw-h-full"
      :value="value"
    />

    <div>
      Some info, copy link button
    </div>
  </div>
</template>

<script setup lang="ts">
import QrCode from 'qrcode.vue'

defineProps<{
  value: string
}>()

const colorMode = useColorMode()
const foreground = computed(
  () => colorMode.value === Theme.dark
    ? '#fff'
    : '#000',
)
</script>

<style scoped lang="scss">
  .qr-share {
    @apply tw-flex-col tw-flex-center-y tw-text-center tw-space-y-8 tw-py-12;
  }
</style>
