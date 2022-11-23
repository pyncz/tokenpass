<template>
  <app-layout>
    <nuxt-layout>
      <nuxt-loading-indicator color="rgb(var(--c-accent-primary))" />

      <nuxt-page v-if="isOnline" />
      <div v-else>
        {{ $t('errors.noConnection') }}.
      </div>
    </nuxt-layout>
  </app-layout>
</template>

<script setup>
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
