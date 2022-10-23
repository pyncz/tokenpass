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
    @apply tw-fixed tw-top-2 tw-right-4 tw-py-1;
    @apply tw-flex tw-gap-4;
    @screen sm {
      @apply tw-top-4 tw-right-8;
    }
  }
</style>
