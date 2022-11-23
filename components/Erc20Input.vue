<template>
  <div class="tw-grid tw-grid-cols-[minmax(0,1fr)] xs:tw-grid-cols-[minmax(0,2fr)_minmax(0,1fr)] tw-gap-3">
    <with-label :label="$t('inUnits')">
      <lib-input
        v-model="units"
        v-bind="unitsInputAttrs"
        :disabled="disabled"
      />
    </with-label>
    <with-label :label="$t('formatted')">
      <lib-input
        v-model="formatted"
        v-bind="formattedInputAttrs"
        :disabled="disabled"
      />
    </with-label>
  </div>
</template>

<script setup lang="ts">
import { ethers } from 'ethers'

const props = defineProps<{
  modelValue: string | number
  decimals: number
  disabled?: boolean
  id?: string
  placeholderUnits?: string
  placeholderFormatted?: string
}>()

// Models
const units = useVModel(props, 'modelValue')

const formatted = computed({
  get: () => {
    try {
      return ethers.utils.formatUnits(units.value, props.decimals)
    } catch (e) {
      return ''
    }
  },
  set: (value: string | number) => {
    let newValue: typeof units.value = ''
    try {
      newValue = ethers.utils.parseUnits(
        value.toString(),
        props.decimals,
      ).toString() ?? ''
    } catch (e) {}
    units.value = newValue
  },
})

// Inputs' attributes
const { t } = useI18n()

const unitsInputAttrs = computed(() => ({
  id: props.id ? `${props.id}-units` : null,
  placeholder: props.placeholderUnits ?? t('index.fields.amount.placeholderUnits'),
}))

const formattedInputAttrs = computed(() => ({
  id: props.id ? `${props.id}-formatted` : null,
  placeholder: props.placeholderFormatted ?? t('index.fields.amount.placeholderFormatted'),
}))
</script>
