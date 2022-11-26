<template>
  <div class="tw-text-center tw-gap-3 tw-flex-center tw-flex-col">
    <lazy-loading-spinner v-if="loading" class="tw-text-xl" />

    <div class="tw-text-dim-2 tw-text-sm tw-pb-2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loading?: boolean
}>()
</script>
