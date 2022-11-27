<template>
  <div class="card-container">
    <div class="tw-relative tw-flex-1 tw-flex tw-flex-col">
      <slot />
    </div>
    <div class="bg">
      <div />
      <div />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .card-container {
    @apply tw-w-full tw-flex tw-flex-col;
    @screen sm {
      @apply tw-bg-card tw-bg-opacity-card tw-relative tw-py-6 tw-px-6 tw-rounded-lg before:tw-rounded-lg;
      @apply before:tw-absolute before:tw-inset-0 before:tw-border before:tw-border-solid before:tw-border-separator-muted before:tw-pointer-events-none;
      &::before {
        background: radial-gradient(12rem at center 100%, rgba(var(--c-accent-primary), 0.05), transparent);
      }
    }
  }
  .bg {
    @apply tw-hidden sm:tw-block;
    @apply tw-absolute tw-inset-0 tw-z-muted tw-blur-lg;
    > * {
      @apply tw-absolute tw-size-48 tw-rounded-lg tw-bg-custom tw-bg-opacity-10;
      box-shadow: 0 0 8rem -3rem rgb(var(--bg-color));
      &:first-child {
        @apply tw-left-0 tw-top-0;
        --bg-color: var(--c-accent-primary);
      }
      &:last-child {
        @apply tw-right-0 tw-bottom-0;
        --bg-color: var(--c-accent-secondary);
      }
    }
  }
</style>
