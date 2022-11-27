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

<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import { storeToRefs } from 'pinia'
import { useClientStore } from './stores'

const isOnline = useNetwork()

// Set up meta tags
const { BASE_URL } = useRuntimeConfig()
useHead({
  titleTemplate: 'tokenpass / %s',
})

useSeoMeta({
  ogImage: `${BASE_URL}/banner.jpg`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

// Init WalletConnect things
const clientStore = useClientStore()
const { init: initAuthClient } = clientStore
const { error: initializationError } = storeToRefs(clientStore)

onMounted(initAuthClient)

whenever(initializationError, (firedError) => {
  if (typeof firedError === 'string') {
    createError({ message: firedError, fatal: true })
  } else {
    createError({ ...firedError, fatal: true })
  }
})
</script>
