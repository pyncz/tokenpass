<template>
  <div class="tw-px-6 tw-section tw-min-h-screen tw-flex tw-flex-col">
    <div class="preferences">
      <switch-locale />
      <switch-theme />
    </div>
    <div class="tw-flex-1 tw-layout-container tw-flex tw-flex-col">
      <slot />
    </div>
    <div class="tw-layout-container">
      <footer-info class="tw-w-full tw-mt-8 md:tw-w-auto" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .preferences {
    @apply tw-fixed tw-z-1 tw-top-0 tw-right-0 tw-left-0 tw-py-4 tw-px-4;
    @apply tw-flex tw-justify-end tw-gap-4 tw-backdrop-blur-sm tw-bg-base tw-bg-opacity-muted;
    box-shadow: 0 0 1rem rgb(var(--c-bg-base));
    @screen sm {
      @apply tw-pt-8 tw-px-8;
    }
  }
</style>
