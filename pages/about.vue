<template>
  <content-doc />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'side',
})

// Head
const { t } = useI18n()

useHead({
  title: ` / ${t('pages.about.title')}`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: t('pages.about.description'),
    },
  ],
})
</script>
