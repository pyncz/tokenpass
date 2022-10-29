<template>
  <disclosure-container
    v-slot="{ open, close }"
    as="div"
    class="disclosure"
    :default-open="initialOpened"
  >
    <disclosure-button class="disclosure-toggle" :class="{ open }">
      <slot name="toggle" v-bind="{ open, close }">
        <div class="toggle-message">
          {{ message }}
        </div>

        <transition appear name="v-fade" mode="out-in">
          <i class="toggle-icon" :class="{ open }">
            <icon name="ion:chevron-down" />
          </i>
        </transition>
      </slot>
    </disclosure-button>
    <disclosure-panel class="disclosure-content">
      <slot />
    </disclosure-panel>
  </disclosure-container>
</template>

<script setup lang="ts">
import {
  DisclosureButton,
  Disclosure as DisclosureContainer,
  DisclosurePanel,
} from '@headlessui/vue'

defineProps<{
  message?: string
  initialOpened?: boolean
}>()
</script>

<style scoped lang="scss">
  .disclosure {
    @apply tw-text-sm tw-py-1;
    &-content {
      @apply tw-py-3;
    }
    &-toggle {
      @apply tw-text-dim-2 tw-text-opacity-soft hover:tw-text-opacity-full tw-duration-onhover-fast tw-font-medium;
      @apply tw-border-b tw-border-dashed tw-border-b-separator-muted hover:tw-border-b-separator-vivid tw-pb-0.5;
      .toggle-message {
        @apply tw-duration-normal tw-inline;
      }
      .toggle-icon {
        @apply tw-duration-fast tw-inline-flex tw-relative tw-top-[3px] tw-left-0.5;
      }
      &.open {
        @apply tw-text-opacity-full;
        .toggle-icon {
          @apply tw-rotate-180;
        }
        .toggle-message {
          @apply tw-text-dim-1;
        }
      }
    }
  }
</style>
