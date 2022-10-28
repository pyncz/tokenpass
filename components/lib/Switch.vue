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

const enabled = useVModel(props)
</script>
