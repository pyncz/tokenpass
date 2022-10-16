<template>
  <combobox v-model="value">
    <div class="tw-relative tw-mt-1">
      {{ value }}
      <div
        class="tw-relative tw-w-full tw-cursor-default tw-overflow-hidden tw-rounded-lg tw-bg-white tw-text-left tw-shadow-md focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-white focus-visible:tw-ring-opacity-75 focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-teal-300 sm:tw-text-sm"
      >
        <combobox-input
          v-model="query"
          class="tw-input tw-w-full tw-py-2 tw-pl-3 tw-pr-10 tw-text-sm tw-leading-5 tw-text-gray-900 focus:tw-ring-0"
        />
        <combobox-button
          class="tw-absolute tw-z-1 tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-2"
        >
          ...
        </combobox-button>
      </div>

      <combobox-options
        class="tw-mt-1 tw-max-h-60 tw-w-full tw-overflow-auto tw-rounded-md tw-bg-white tw-py-1 tw-text-base tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none sm:tw-text-sm"
      >
        <!-- if query is valid? -->
        <combobox-option :value="query">
          Use "{{ query }}"
        </combobox-option>

        <combobox-option
          v-for="option of filteredOptions"
          :key="option.value"
          v-slot="{ selected, active }"
          as="template"
          :value="option.value"
        >
          <li
            class="tw-relative tw-cursor-default tw-select-none tw-py-2 tw-pl-10 tw-pr-4"
            :class="{
              'tw-bg-teal-600 tw-text-white': active,
              'tw-text-gray-900': !active,
            }"
          >
            <span
              class="tw-block tw-truncate"
              :class="selected ? 'tw-font-medium' : 'tw-font-normal'"
            >
              {{ option.label ?? option.value }}
            </span>
            <span
              v-if="selected"
              class="tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-pl-3"
              :class="active ? 'tw-text-white' : 'tw-text-teal-600'"
            >
              yea
            </span>
          </li>
        </combobox-option>
      </combobox-options>
    </div>
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
import type { SelectOption } from '../../models'
import { squeeze } from '../../utils'

interface Props {
  options: SelectOption[]
  lookup: (keyof SelectOption)[]
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  lookup: () => ['value', 'label'],
})

const value = ref(props.options[0].value)
const query = ref('')

const filteredOptions = computed(() =>
  query.value === ''
    ? props.options
    : props.options.filter(
      option => props.lookup.some(
        (lookupKey) => {
          const valueToCompare = option[lookupKey]
          return valueToCompare
            ? squeeze(valueToCompare).includes(squeeze(query.value))
            : false
        },
      ),
    ),
)
</script>
