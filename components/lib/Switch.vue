<template>
  <toggle-switcher v-model="enabled" class="tw-switcher" :class="{ enabled }">
    <span class="indicator" />
  </toggle-switcher>
</template>

<script setup lang="ts">
import { Switch as ToggleSwitcher } from '@headlessui/vue'

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const enabled = useVModel(props, 'modelValue', emit)
</script>
