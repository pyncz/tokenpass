<template>
  <div class="tw-space-y-1">
    <p class="tw-text-xs tw-text-dim-3">
      {{ $t('contractCheck.type', { type: type ?? 'NFT' }) }}
    </p>

    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type?: string
}>()
</script>
