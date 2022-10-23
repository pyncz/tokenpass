<template>
  <div class="tw-section tw-px-4 tw-form">
    <a class="main-link" role="button" @click="redirectOrRefresh({ name: 'index' })">
      <logo-main />
    </a>
    <switch-locale />
    <switch-theme />
    <slot />
  </div>
</template>

<script setup lang="ts">
const localeRoute = useLocaleRoute()
const redirectOrRefresh = useRedirectOrRefresh(localeRoute)
</script>

<style scoped lang="scss">
.main-link {
  @apply tw-inline-flex tw--mx-1.5 tw-duration-normal tw-opacity-soft hover:tw-opacity-full;
}
</style>
