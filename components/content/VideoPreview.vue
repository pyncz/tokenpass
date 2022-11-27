<template>
  <video
    muted
    loop
    autoplay
    playsinline
    controls
    class="tw-w-full tw-mb-12 tw-max-w-[48rem] tw-shadow-modal tw-border tw-rounded-lg tw-border-separator-muted tw-border-opacity-soft"
  >
    <source :src="uri" type="video/mp4">
  </video>
</template>

<script setup lang="ts">
defineProps<{
  uri: string
}>()
</script>
