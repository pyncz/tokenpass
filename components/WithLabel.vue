<template>
  <div class="tw-field">
    <div class="tw-label field-meta">
      {{ label }}
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>
