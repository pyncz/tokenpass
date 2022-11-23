<template>
  <input v-model="model" class="tw-input">
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | number
}>()

const model = useVModel(props, 'modelValue')
</script>
