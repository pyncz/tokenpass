<template>
  <div class="tw-text-dim-1">
    {{ $t('summary.title') }}
    <icon v-if="showIcon" name="info" class="tw-text-dim-3" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  showIcon?: boolean
}>()
</script>
