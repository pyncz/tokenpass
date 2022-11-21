<template>
  <a
    class="main-link tw--m-1"
    role="button"
    @click="redirectOrRefresh({ name: 'index' })"
  >
    <logo-main :size="size" :short="short" />
  </a>
</template>

<script setup lang="ts">
import type { SizeExta } from '~~/models'

defineProps<{
  short?: boolean
  size?: SizeExta
}>()

const localeRoute = useLocaleRoute()
const redirectOrRefresh = makeRedirectOrRefresh(localeRoute)
</script>

<style scoped lang="scss">
.main-link {
  @apply tw-inline-flex tw--mx-1.5 tw-duration-normal tw-opacity-soft hover:tw-opacity-full;
}
</style>
