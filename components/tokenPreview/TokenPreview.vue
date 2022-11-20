<template>
  <div class="tw-space-y-1">
    <p class="tw-text-xs tw-text-dim-3">
      {{ $t('contractCheck.type', { type: type ?? 'NFT' }) }}
    </p>

    <with-skeleton :evaluating="evaluating">
      <slot />
    </with-skeleton>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type?: string
  evaluating?: boolean
}>()
</script>
