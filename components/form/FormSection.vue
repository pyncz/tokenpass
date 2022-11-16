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
withDefaults(defineProps<{
  icon?: string
  color?: string
}>(), {
  color: 'var(--c-bg-dim-2)',
})
</script>

<style scoped lang="scss">
  .form-section {
    @apply tw-pt-1;
    &-group {
      @apply tw-duration-normal tw-relative tw-bg-card tw-bg-opacity-group tw-px-4 tw-py-5 tw-rounded tw-border tw-border-solid tw-border-custom tw-border-opacity-20;
      @apply before:tw-bg-custom before:tw-bg-opacity-[0.05] before:tw-absolute before:tw-inset-0;
      --bg-color: v-bind(color);
      --border-color: v-bind(color);
    }
  }
</style>
