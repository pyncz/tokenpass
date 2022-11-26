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
import { storeToRefs } from 'pinia'
import { useClientStore } from './stores'

const isOnline = useNetwork()

useHead({
  titleTemplate: 'tokenpass %s',
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
