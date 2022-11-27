<template>
  <content-doc />
</template>

<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'

definePageMeta({
  layout: 'side',
})

// Head
const { t } = useI18n()

useHead({
  title: t('pages.about.title'),
})

useSeoMeta({
  ogTitle: t('pages.about.title'),
  description: t('pages.about.description'),
  ogDescription: t('pages.about.description'),
})
</script>
