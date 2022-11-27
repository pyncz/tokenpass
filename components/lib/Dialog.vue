<template>
  <lib-modal v-slot="{ close }" v-model:opened="model">
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

      <div class="tw-pb-9 tw-flex-1">
        <slot v-bind="{ close }" />
      </div>

      <div class="tw-flex tw-flex-col tw-gap-4">
        <slot name="actions" v-bind="{ close }">
          <lib-button class="close-control tw-button-secondary" @click="close()">
            {{ $t('actions.close') }}
          </lib-button>
          <slot name="main-actions" v-bind="{ close }" />
        </slot>
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

const props = defineProps<{
  title?: string
  description?: string
  opened: boolean
}>()

const model = useVModel(props, 'opened')
</script>

<style scoped lang="scss">
  .dialog {
    @apply tw-flex tw-flex-col tw-fixed tw--bottom-4 tw-inset-x-0;
    @screen sm {
      @apply tw-relative tw-width-dialog;
      @apply before:tw-absolute before:tw-inset-0 before:tw-pointer-events-none before:tw-rounded-lg before:tw-opacity-muted before:tw-border before:tw-border-solid before:tw-border-text-dim-2;
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
