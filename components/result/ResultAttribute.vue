<template>
  <div class="tw-space-y-0.5 tw-pt-1">
    <p class="tw-text-xl">
      {{ value }}
    </p>

    <div class="tw-text-xs tw-font-medium tw-text-dim-2">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: number | string
}>()
</script>
