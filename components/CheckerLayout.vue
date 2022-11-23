<template>
  <div class="layout">
    <div class="tw-sticky tw-top-4 sm:tw-top-8 tw-z-[2]">
      <logo-main-link :short="shortLogo" />
    </div>

    <span class="md:tw-col-[2] tw--mt-0.5 tw-opacity-soft">
      <slot name="title">
        <h1>
          {{ title }}
        </h1>
      </slot>
    </span>

    <summary-info class="md:tw-col-[2] md:tw-row-[2] lg:tw-col-[3] lg:tw-row-[1/span_4]" />

    <setup-state class="md:tw-row-[2/4]" />

    <div class="md:tw-col-[2] md:tw-row-[3/5] lg:tw-row-[2/5]">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()

const breakpoints = useTailwindBreakpoints()
const shortLogo = breakpoints.smallerOrEqual('xs')
</script>

<style scoped lang="scss">
.layout {
  @apply tw-w-full tw-grid tw-gap-y-4 tw-gap-x-8 tw-justify-center tw-items-start;
  grid-template-columns: minmax(0, 1fr);
  @screen md {
    // right sidebar
    grid-template-columns: minmax(12rem, 1fr) minmax(0, 2fr);
  }
  @screen lg {
    // symmetric sidebars
    grid-template-columns: minmax(12rem, 1fr) minmax(0, 24rem) minmax(12rem, 1fr);
  }
}
</style>
