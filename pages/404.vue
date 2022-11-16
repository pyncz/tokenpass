<template>
  <div class="tw-flex tw-flex-col sm:tw-flex-row">
    <div class="error-code">
      404
    </div>
    <p>
      {{ $t('errors.notFound') }}
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'message',
})
</script>

<style lang="scss">
  .error-code {
    @apply tw-h1;
  }
</style>
