<template>
  <div class="tw-section tw-min-h-screen tw-flex tw-flex-col">
    <div class="preferences">
      <switch-locale />
      <switch-theme />
    </div>
    <div class="tw-px-6 tw-flex-1 tw-layout-container tw-flex tw-flex-col">
      <nuxt-layout>
        <nuxt-loading-indicator />

        <nuxt-page v-if="isOnline" />
        <div v-else>
          {{ $t('errors.noConnection') }}.
        </div>
      </nuxt-layout>
    </div>
    <div class="tw-layout-container">
      <footer-info class="tw-w-full tw-mt-8 md:tw-w-auto" />
    </div>
  </div>
</template>

<script setup>
import './assets/scss/tailwind.scss'

const isOnline = useNetwork()

const pageName = useRouteBaseName()
const { t, te } = useI18n()

const head = te(`pages.${pageName}`)
  ? {
      titleTemplate: 'tokenpass %s',
      title: ` / ${t(`pages.${pageName}.title`)}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: t(`pages.${pageName}.description`),
        },
      ],
    }
  : {}

useHead(head)
</script>

<style lang="scss">
  .preferences {
    @apply tw-fixed tw-z-1 tw-top-0 tw-right-0 tw-left-0 tw-py-4 tw-px-4;
    @apply tw-flex tw-justify-end tw-gap-4 tw-backdrop-blur-sm tw-bg-base tw-bg-opacity-muted;
    box-shadow: 0 0 1rem rgb(var(--c-bg-base));
    @screen sm {
      @apply tw-pt-8 tw-px-8;
    }
  }
</style>
