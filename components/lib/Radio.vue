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
        v-for="option, index of options"
        :key="getKey(option, index)"
        v-slot="{ checked }"
        :value="getValue(option)"
      >
        <slot name="option" v-bind="{ option, checked }">
          <div class="radio-option-button tw-clickable" :class="{ checked, disabled }">
            <radio-group-label as="div" class="tw-z-1">
              <span class="tw-font-medium">
                {{ option }}
              </span>
            </radio-group-label>
          </div>
        </slot>
      </radio-group-option>
    </div>
  </radio-group>
</template>

<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'
import type { Numeric } from '@voire/type-utils'
import type { Direction } from '../../models'

type Value = any
type Option = any

interface Props {
  modelValue: Value
  options?: Option[]

  label?: string
  disabled?: boolean
  thin?: boolean
  direction?: Direction

  // How to render list of the options
  getKey?: (_option: Option, _index: number) => Numeric

  // Getter to a value to use as a model
  getValue?: (_option: Option) => Value
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  getKey: (_option: Option, index: number) => index,
  getValue: (option: Option) => option,
})

const model = useVModel(props, 'modelValue')
</script>

<style scoped lang="scss">
  .radio {
    @apply tw-flex tw-text-sm tw-flex-col sm:tw-items-start;
    &-group {
      @apply tw-bg-custom tw-bg-opacity-custom;
      @apply tw-duration-onhover-fast tw-p-1 tw-rounded tw-flex tw-flex-col sm:tw-flex-row tw-gap-1;
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
      @apply tw-border-separator-muted tw-bg-dim-2 tw-rounded-lg;
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
    }
  }
</style>
