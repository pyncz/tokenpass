<template>
  <div class="layout">
    <div>
      <a
        class="main-link"
        role="button"
        @click="redirectOrRefresh({ name: 'index' })"
      >
        <logo-main />
      </a>
    </div>

    <h1 class="title">
      {{ title }}
    </h1>

    <div class="setup">
      Here will be current setup
    </div>

    <div class="content">
      Content...
      <slot />
    </div>

    <footer class="footer">
      Footer links / copyright
    </footer>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
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
  @apply tw-grid tw-gap-y-4 tw-gap-x-6;
  @screen md {
    // right sidebar
    grid-template-columns: minmax(12rem, 1fr) minmax(0, 2fr);
    .title {
      grid-column: 2;
    }
  }
  @screen lg {
    // symmetric sidebars
    grid-template-columns: minmax(12rem, 1fr) minmax(0, 2fr) minmax(12rem, 1fr);
  }
}
</style>
