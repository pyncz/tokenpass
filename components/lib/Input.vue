<template>
  <input v-model="value" class="tw-input">
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const value = useVModel(props)
</script>
