<template>
  <button @click="$emit('click')">
    <span class="tw-relative"><slot /></span>
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'click'): void
}>()
</script>
