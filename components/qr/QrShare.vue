<template>
  <qr-code
    :size="400"
    background="transparent"
    :foreground="foreground"
    class="tw-mx-auto tw-aspect-1 !tw-w-full !tw-h-auto"
    :value="value"
  />

  <lib-button
    class="tw-button-secondary sm:tw-min-w-[12em] tw-h-auto tw-text-xl sm:tw-text-normal tw-p-[0.5em]"
    @click="copy()"
  >
    <icon name="copy" />
    {{ message }}
  </lib-button>
  <div>
    <div v-if="checking">
      {{ $t('status.checking') }}...
    </div>
  </div>

  <lazy-lib-dialog v-if="!!result" :opened="true">
    {{ result.passed ? 'success' : 'nah' }}
  </lazy-lib-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import QrCode from 'qrcode.vue'
import { useCheckingStore } from '../../stores'

const props = defineProps<{
  value: string
}>()
const { value } = toRefs(props)

const { message, copy } = useCopy(value)

const colorMode = useColorMode()
const foreground = computed(
  () => colorMode.value === Theme.dark
    ? '#fff'
    : '#000',
)

const { checking, result } = storeToRefs(useCheckingStore())
</script>
