<template>
  <layout-checker :title="$t('index.title.setup')">
    <card-container>
      <setup-form />
    </card-container>
  </layout-checker>
</template>

<script setup lang="ts">
import { useSetupStore } from '../stores'

definePageMeta({
  middleware: () => {
    // without the `storeToRefs` as it's an one-time check
    const { connectUri } = useSetupStore()

    if (connectUri) {
      const { $localePath } = useNuxtApp()
      return navigateTo($localePath({ name: 'share' }))
    }
  },
})
</script>
