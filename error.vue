<template>
  <app-layout>
    <div class="tw-hidden sm:tw-block tw-fixed tw-z-[2] tw-top-4 sm:tw-top-8">
      <logo-main-link />
    </div>

    <div class="tw-flex-center tw-flex-col tw-flex-1">
      <div class="tw-space-y-8 tw-text-center">
        <div class="error-code">
          {{ error.statusCode }}
        </div>

        <p class="tw-h4 tw-text-dim-2">
          {{ isNotFoundError ? $t('errors.notFound') : error.message }}
        </p>
      </div>
    </div>
  </app-layout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const title = computed(() => `${props.error.statusCode} | ${props.error.message}`)

useHead({
  title,
})

const isNotFoundError = computed(() => +props.error.statusCode === 404)
</script>

<style scoped lang="scss">
  .error-code {
    @apply tw-py-2 tw-px-5 tw-text-[6em] tw-border-b tw-border-accent-primary;
    box-shadow: inset 0 100% red;
    mask-image: linear-gradient(to right, rgba(0,0,0,0.1), rgb(0,0,0), rgba(0,0,0,0.1));
    background-image: radial-gradient(100% 50% at bottom center, rgba(var(--c-accent-primary), 0.25), rgba(var(--c-accent-primary), 0));
  }
</style>
