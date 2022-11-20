<template>
  <loading-skeleton v-if="evaluating" class="tw-h-6 tw-w-full xs:tw-w-32" />
  <slot v-else />
</template>

<script setup lang="ts">
defineProps<{
  evaluating?: boolean
}>()
</script>
