<template>
  <a
    role="button"
    class="tw-circle-[1.5em] tw-inline-flex tw-items-center tw-justify-center tw-overflow-hidden tw-relative before:tw-absolute before:tw-inset-0 before:tw-bg-accent-primary before:tw-z-muted before:tw-scale-0 before:tw-opacity-10 hover:before:tw-scale-normal hover:before:tw-opacity-10 before:tw-rounded-full before:tw-duration-fast active:before:tw-scale-click"
    @click="$emit('click')"
  >
    <icon
      name="ion:arrow-back"
      class="tw-text-3/4 tw-text-accent-primary"
    />
  </a>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'click'): void
}>()
</script>
