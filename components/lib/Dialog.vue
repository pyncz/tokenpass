<template>
  <lib-modal v-slot="{ close, open }">
    <dialog-panel class="tw-dialog dialog">
      <button tabindex="-1" class="close-button" @click="close()">
        <icon name="close" class="tw-z-1" />
      </button>
      <dialog-title v-if="title">
        {{ title }}
      </dialog-title>
      <dialog-description v-if="description">
        {{ description }}
      </dialog-description>

      <div class="tw-pb-6 tw-flex-1">
        <slot v-bind="{ close, open }" />
      </div>

      <div class="tw-flex tw-flex-col tw-gap-3">
        <button class="close-control tw-button-secondary" @click="close()">
          Close
        </button>
        <slot name="controls" v-bind="{ close, open }" />
      </div>
    </dialog-panel>
  </lib-modal>
</template>

<script setup lang="ts">
import {
  DialogDescription,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

defineProps<{
  title?: string
  description?: string
}>()
</script>

<style scoped lang="scss">
  .dialog {
    @apply tw-flex tw-flex-col tw-fixed tw--bottom-4 tw-inset-x-0;
    @screen sm {
      @apply tw-relative tw-bordered tw-width-dialog;
      @apply before:tw-rounded-lg before:tw-opacity-muted;
      &::before {
        mask-image: radial-gradient(50% 50% at top center, rgba(white, 0.5), rgba(white, 0.2));
      }
    }

    .close-button {
      @apply tw-icon-button;
      @apply tw-absolute tw-hidden sm:tw-flex tw-right-3 tw-top-3;
    }

    .close-control {
      @apply tw-w-full sm:tw-hidden;
    }
  }
</style>
