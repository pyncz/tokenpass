<template>
  <nuxt-layout>
    <nuxt-loading-indicator />

    <nuxt-page v-if="isOnline" />
    <div v-else>
      {{ $t('errors.noConnection') }}.
    </div>

    <div class="preferences">
      <switch-locale />
      <switch-theme />
    </div>
  </nuxt-layout>
</template>

<script setup>
import '~/assets/scss/tailwind.scss'

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
    @apply tw-fixed tw-top-0 tw-right-0 tw-left-0 tw-py-4 tw-px-4;
    @apply tw-flex tw-justify-end tw-gap-4 tw-backdrop-blur-sm tw-bg-base tw-bg-opacity-muted;
    box-shadow: 0 0 1rem rgb(var(--c-bg-base));
    @screen sm {
      @apply tw-pt-8 tw-px-8;
    }
  }
</style>
