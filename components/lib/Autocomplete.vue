<template>
  <combobox v-model="model" as="div" class="tw-relative">
    <div class="tw-relative">
      <combobox-input
        :id="id"
        :display-value="getDisplay"
        class="tw-input tw-w-full tw-pr-10"
        @change="(q) => query = q.target.value"
      />
      <combobox-button class="tw-absolute tw-inset-y-0 tw-right-0 tw-flex-center tw-px-2">
        <div class="tw-icon-button tw-flex">
          <icon name="chevron-down" class="tw-relative" />
        </div>
      </combobox-button>
    </div>

    <combobox-options class="tw-options">
      <div
        v-if="forbidCustom && !filteredOptions.length"
        class="tw-combo-container tw-text-dim-3"
      >
        {{ $t('errors.notFound') }}
      </div>

      <combobox-option v-if="query && !forbidCustom" :value="query" class="tw-cursor-pointer">
        <slot name="custom-option" v-bind="{ query }">
          <div class="tw-combo-option">
            {{ $t('actions.use') }}
            <code>{{ query }}</code>
          </div>
        </slot>
      </combobox-option>

      <combobox-option
        v-for="option, index of filteredOptions"
        :key="getKey(option, index)"
        v-slot="{ selected, active }"
        :value="getValue(option)"
        class="tw-cursor-pointer tw-relative tw-select-none"
      >
        <slot name="option" v-bind="{ option, selected, active }">
          <div
            class="tw-combo-option"
            :class="{ 'tw-text-accent-primary': selected }"
          >
            {{ option }}
          </div>
        </slot>
      </combobox-option>
    </combobox-options>
  </combobox>
</template>

<script setup lang="ts">
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'
import type { Numeric } from '@voire/type-utils'

type Value = any
type Option = any

interface Props {
  id?: string
  modelValue: Value
  options?: Option[]
  forbidCustom?: boolean

  // How to render list of the options
  filter?: (_options: Option[], _query: string) => Option[]
  getKey?: (_option: Option, _index: number) => Numeric

  // Getter to a value to use as a model
  getValue?: (_option: Option) => Value

  // What to display in the input
  getDisplay?: (_value?: Value) => string
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  forbidCustom: false,
  filter: (options: Option[]) => options,
  getKey: (_option: Option, index: number) => index,
  getValue: (option: Option) => option,
  getDisplay: (value?: Value) => value?.toString(),
})

const model = useVModel(props, 'modelValue')
const query = ref<string>(model.value?.toString() ?? '')
const { options, filter } = toRefs(props)

const filteredOptions = computed(() => {
  const q = query.value
  return q
    ? filter.value(options.value, q)
    : options.value
})
</script>
