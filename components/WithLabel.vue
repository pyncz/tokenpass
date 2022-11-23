<template>
  <div class="tw-space-y-1.5">
    <div class="tw-label">
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
