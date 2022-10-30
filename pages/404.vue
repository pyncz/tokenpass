<template>
  <div class="tw-flex-1 tw-flex tw-flex-center">
    <div class="tw-flex tw-flex-col sm:tw-flex-row">
      <div class="error-code">
        404
      </div>
      <p>
        {{ $t('errors.notFound') }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
  .error-code {
    @apply tw-h1;
  }
</style>
