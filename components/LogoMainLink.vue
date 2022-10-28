<template>
  <a
    class="main-link tw--m-1"
    role="button"
    @click="redirectOrRefresh({ name: 'index' })"
  >
    <logo-main />
  </a>
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
