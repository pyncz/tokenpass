<template>
  <div class="layout">
    <div class="layout-grid">
      <div class="tw--m-1">
        <a
          class="main-link"
          role="button"
          @click="redirectOrRefresh({ name: 'index' })"
        >
          <logo-main />
        </a>
      </div>

      <h1 class="md:tw-col-[2] tw--mt-0.5">
        {{ title }}
      </h1>

      <section class="tw-info md:tw-col-[2] md:tw-row-[2] lg:tw-col-[3] lg:tw-row-[1/span_4]">
        Adds?
      </section>

      <div class="md:tw-row-[2/span_2] lg:tw-row-[2/span_1]">
        <div class="tw-info tw-text-sm tw-text-dim-2">
          Here will be current setup
        </div>
      </div>

      <div class="md:tw-col-[2] md:tw-row-[3/span_2] lg:tw-row-[2/span_3]">
        Content...
        <slot />
      </div>

      <footer-info class="tw-mt-8 md:tw-col-1 md:tw-row-[4] md:tw-mt-auto" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
const localeRoute = useLocaleRoute()
const redirectOrRefresh = useRedirectOrRefresh(localeRoute)
</script>

<style scoped lang="scss">
.main-link {
  @apply tw-inline-flex tw--mx-1.5 tw-duration-normal tw-opacity-soft hover:tw-opacity-full;
}

.layout {
  @apply tw-flex-center;
  &-grid {
    @apply tw-grid tw-w-full tw-gap-y-4 tw-gap-x-8 tw-justify-center tw-items-start;
    grid-template-columns: minmax(0, 1fr);
    @screen xs {
      width: 80vw;
      max-width: 56rem;
    }
    @screen md {
      // right sidebar
      grid-template-columns: minmax(12rem, 1fr) minmax(0, 2fr);
    }
    @screen lg {
      // symmetric sidebars
      grid-template-columns: minmax(12rem, 1fr) minmax(0, 24rem) minmax(12rem, 1fr);
    }
  }
}
</style>
