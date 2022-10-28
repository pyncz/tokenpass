<template>
  <div class="layout">
    <div class="layout-grid">
      <div class="tw-sticky tw-top-3 md:tw-top-7 tw-z-[2]">
        <logo-main-link />
      </div>

      <h1 class="md:tw-col-[2] tw--mt-0.5 tw-opacity-soft">
        {{ title }}
      </h1>

      <section v-if="ads.length" class="tw-callout md:tw-col-[2] md:tw-row-[2] lg:tw-col-[3] lg:tw-row-[1/span_4]">
        Ads?
      </section>

      <div class="md:tw-row-[2/4]">
        <setup-state />
      </div>

      <div class="md:tw-col-[2] md:tw-row-[3/5] lg:tw-row-[2/5]" :class="{ 'md:tw-row-[2/5]': !ads.length }">
        <slot />
      </div>

      <footer-info class="tw-mt-8 md:tw-pb-1 md:tw-col-1 md:tw-row-[4] md:tw-mt-auto" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdsStore } from '~~/stores'

defineProps<{
  title: string
}>()
const { ads } = useAdsStore()
</script>

<style scoped lang="scss">
.layout {
  @apply tw-flex-center;
  &-grid {
    @apply tw-grid tw-w-full tw-gap-y-4 tw-gap-x-8 tw-justify-center tw-items-start;
    grid-template-columns: minmax(0, 1fr);
    max-width: 24rem;
    @screen xs {
      width: 80vw;
    }
    @screen md {
      // right sidebar
      grid-template-columns: minmax(12rem, 1fr) minmax(0, 2fr);
      max-width: 56rem;
    }
    @screen lg {
      // symmetric sidebars
      grid-template-columns: minmax(12rem, 1fr) minmax(0, 24rem) minmax(12rem, 1fr);
    }
  }
}
</style>
