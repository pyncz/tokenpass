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

useHead({
  titleTemplate: 'tokenpass %s',
})
</script>
