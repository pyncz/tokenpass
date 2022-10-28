<template>
  <radio-group
    v-model="model"
    class="radio"
    :class="[direction ? `dir-${direction}` : undefined, { thin }]"
    :disabled="disabled"
  >
    <radio-group-label v-if="label" class="tw-h5">
      {{ label }}
    </radio-group-label>

    <div class="radio-group tw-input-border">
      <radio-group-option
        v-for="option of options"
        :key="option.value"
        v-slot="{ checked }"
        :value="option.value"
      >
        <slot name="option" v-bind="{ option, checked }">
          <div class="radio-option-button tw-button" :class="{ checked, disabled }">
            <div class="radio-option-content">
              <radio-group-label as="template">
                <span class="radio-option-label">
                  {{ option.label ?? option.value }}
                </span>
              </radio-group-label>
              <radio-group-description v-if="option.description" class="radio-option-description" as="p">
                {{ option.description }}
              </radio-group-description>
            </div>
          </div>
        </slot>
      </radio-group-option>
    </div>
  </radio-group>
</template>

<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'
import type { Direction, SelectOption } from '../../models'

const props = defineProps<{
  modelValue: string
  options: SelectOption[]
  label?: string
  disabled?: boolean
  thin?: boolean
  direction?: Direction
}>()

const model = useVModel(props)
</script>

<style lang="scss">
  .radio {
    @apply tw-flex tw-text-sm tw-flex-col sm:tw-items-start;
    &-group {
      @apply tw-bg-custom tw-bg-opacity-custom;
      @apply tw-transition-hover tw-p-1 tw-rounded tw-flex tw-flex-col sm:tw-flex-row tw-gap-1;
      --bg-color: var(--c-radio-bg);
      --bg-opacity: var(--o-radio-bg);
    }
    &.dir-x &-group {
      @apply tw-flex-row;
    }
    &.dir-y &-group {
      @apply tw-flex-col;
    }
    &.thin &-group {
      @apply tw-border-separator-muted tw-bg-dim-1 tw-rounded-lg;
      --bg-opacity: 0;
    }
    &-option {
      &-button {
        @apply tw-text-custom tw-relative tw-text-center tw-w-full tw-flex-col tw-min-w-radio tw-h-8;
        @apply before:tw-rounded before:tw-absolute before:tw-inset-0 before:tw-scale-50 before:tw-transition-nobg-fast;
        --text-color: var(--c-radio-option-text);
        &:before {
          @apply tw-bg-custom tw-bg-opacity-custom;
          --bg-color: var(--c-radio-option-bg);
          --bg-opacity: var(--o-radio-option-bg);
        }
        &:hover {
          --text-color: var(--c-radio-option-text-hover);
        }
        &.checked {
          @apply before:tw-scale-normal;
          --text-color: var(--c-radio-option-checked-text);
          &:before {
            --bg-color: var(--c-radio-option-checked-bg);
            --bg-opacity: var(--o-radio-option-checked-bg);
          }
          &:hover {
            --text-color: var(--c-radio-option-checked-text-hover);
          }
        }
        &.disabled {
          @apply tw-opacity-soft tw-cursor-not-allowed;
        }
      }
      &-content {
        @apply tw-z-1;
      }
      &-label {
        @apply tw-font-medium;
      }
      &-description {
        @apply tw-opacity-muted tw-text-3/4;
      }
    }
  }
</style>
