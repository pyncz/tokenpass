<template>
  <div class="tw-px-6 tw-min-h-screen tw-flex tw-flex-col">
    <div class="control-panel">
      <initialization-status />

      <div class="tw-flex tw-gap-4">
        <switch-locale />
        <switch-theme />
      </div>
    </div>

    <div class="tw-flex-1 tw-layout-container tw-flex tw-flex-col">
      <slot />
    </div>
    <div class="tw-layout-container tw-pb-20 md:tw-pb-28">
      <footer-info class="tw-w-full tw-mt-8 md:tw-w-auto" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .control-panel {
    @apply tw-fixed tw-z-1 tw-top-0 tw-right-0 tw-left-0 tw-py-4 tw-px-4;
    @apply tw-flex-center-y tw-justify-end tw-gap-4 tw-backdrop-blur-sm tw-bg-base tw-bg-opacity-[0.01];
    @screen sm {
      @apply tw-pt-8 tw-px-8;
    }
  }
</style>
