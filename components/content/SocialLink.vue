<template>
  <a
    :href="uri"
    class="tw-inline-flex tw-h2 tw-text-base tw-m-1 tw-duration-onhover-fast tw-opacity-soft hover:tw-opacity-full"
    target="_blank"
    role="button"
    rel="noopener noreferrer"
  >
    <icon :name="site" />
  </a>
</template>

<script setup lang="ts">
defineProps<{
  site: string
  uri: string
}>()
</script>
