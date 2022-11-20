<template>
  <section class="form-section">
    <icon
      v-if="icon"
      :name="icon"
      size="1.15em"
      class="tw-absolute tw-left-3.5 tw--top-2"
    />
    <div class="tw-relative">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  icon?: string
}>()
</script>

<style scoped lang="scss">
  .form-section {
    @apply tw-relative tw-top-1;
      @apply tw-duration-normal tw-relative tw-px-4 tw-py-5 tw-rounded tw-border tw-border-solid tw-border-custom tw-border-opacity-custom tw-bg-custom tw-bg-opacity-custom;
      --bg-color: var(--c-bg-base);
      --bg-opacity: 1;
      --border-color: var(--c-separator-muted);
      --border-opacity: 1;
  }
</style>
