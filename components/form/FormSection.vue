<template>
  <section class="form-section">
    <div class="form-section-group">
      <icon
        v-if="icon"
        :name="icon"
        size="1.15em"
        class="tw-absolute tw-left-3.5 tw--top-2"
      />
      <div class="tw-relative">
        <slot />
      </div>
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
    @apply tw-pt-1;
    &-group {
      @apply tw-duration-normal tw-relative tw-px-4 tw-py-5 tw-rounded tw-border tw-border-solid tw-border-custom tw-bg-custom;
      --bg-color: var(--c-bg-base);
      --border-color: var(--c-separator-muted);
    }
  }
</style>
