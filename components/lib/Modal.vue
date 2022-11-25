<template>
  <transition-root appear :show="model" as="template">
    <modal-overlay class="modal" @close="close()">
      <transition-child
        as="template"
        enter="tw-duration-normal tw-ease-out"
        enter-from="tw-opacity-0"
        enter-to="tw-opacity-full"
        leave="tw-duration-fast tw-ease-in"
        leave-from="tw-opacity-full"
        leave-to="tw-opacity-0"
      >
        <div class="overlay" />
      </transition-child>
      <div class="modal-wrapper tw">
        <transition-child
          as="template"
          enter="tw-duration-normal tw-ease-out"
          enter-from="tw-translate-y-20 sm:tw-translate-y-4 tw-opacity-0 tw-scale-click"
          enter-to="tw-opacity-full tw-scale-normal"
          leave="tw-duration-fast tw-ease-in"
          leave-from="tw-opacity-full tw-scale-normal"
          leave-to="tw-translate-y-32 sm:tw--translate-y-4 tw-opacity-0 tw-scale-click"
        >
          <div class="modal-container">
            <slot v-bind="{ open, close }" />
          </div>
        </transition-child>
      </div>
    </modal-overlay>
  </transition-root>
</template>

<script setup lang="ts">
import {
  Dialog as ModalOverlay,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

const props = defineProps<{
  opened: boolean
}>()

const model = useVModel(props, 'opened')

const close = () => {
  model.value = false
}

const open = () => {
  model.value = true
}
</script>

<style lang="scss">
  .modal {
    @apply tw-modal-container tw-z-modal;
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
