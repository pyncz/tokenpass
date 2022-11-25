<template>
  <button class="tw-max-w-full tw-flex" @click="$emit('click')">
    <span class="tw-relative tw-w-full"><slot /></span>
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'click'): void
}>()
</script>
