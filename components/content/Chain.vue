<template>
  <chain-representation :chain-id="+id" />
</template>

<script setup lang="ts">
// Map component for using in @nuxt/content's markdown
defineProps<{
  id: string
}>()
</script>
