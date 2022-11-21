<template>
  <modal-overlay class="modal" :open="opened" @close="close()">
    <div class="overlay" />
    <div class="modal-wrapper">
      <div class="modal-container">
        <slot v-bind="{ open, close }" />
      </div>
    </div>
  </modal-overlay>
</template>

<script setup lang="ts">
import {
  Dialog as ModalOverlay,
} from '@headlessui/vue'

const props = defineProps<{
  opened: boolean
}>()

const opened = useVModel(props, 'opened')

function close() {
  opened.value = false
}

function open() {
  opened.value = true
}
</script>

<style scoped lang="scss">
  .modal {
    @apply tw-modal-container;
    .overlay {
      @apply tw-modal-container;
      @apply tw-bg-overlay tw-bg-opacity-modal tw-backdrop-blur-xs;
    }
    &-wrapper {
      @apply tw-modal-container tw-overflow-y-auto;
    }
    &-container {
      @apply tw-flex-center tw-min-h-full tw-p-4;
    }
  }
</style>
