<template>
  <div class="fixed top-16 w-72">
    <combobox v-model="value">
      <div class="relative mt-1">
        <div
          class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
        >
          <combobox-input
            class="tw-input w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            :display-value="(option) => option ? (option as SelectOption).label ?? (option as SelectOption).value : ''"
            @change="query = $event.target.value"
          />
          <combobox-button
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <chevron-up-down-icon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </combobox-button>
        </div>
        <transition-root
          leave="transition ease-in duration-100"
          leave-from="opacity-100"
          leave-to="opacity-0"
          @after-leave="query = ''"
        >
          <combobox-options
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <!-- if query is valid? -->
            <combobox-option :value="queryOption">
              Use "{{ query }}"
            </combobox-option>

            <combobox-option
              v-for="option of filteredOptions"
              :key="option.value"
              v-slot="{ selected, active }"
              as="template"
              :value="option"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="selected ? 'font-medium' : 'font-normal'"
                >
                  {{ option.label ?? option.value }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="active ? 'text-white' : 'text-teal-600'"
                >
                  yea
                </span>
              </li>
            </combobox-option>
          </combobox-options>
        </transition-root>
      </div>
    </combobox>
  </div>
</template>

<script setup lang="ts">
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  TransitionRoot,
} from '@headlessui/vue'
import { SelectOption } from '../../models'
import { squeeze } from '../../utils'

interface Props {
  options: SelectOption[]
  lookup: (keyof SelectOption)[]
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  lookup: () => ['value', 'label'],
})

const value = ref(props.options[0])
const query = ref('')

const queryOption = computed<SelectOption>(() => ({
  value: query.value,
}))

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
