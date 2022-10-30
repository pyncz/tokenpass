<template>
  <layout-checker>
    <template #title>
      <a role="button" @click="resetSetupState">
        <icon
          name="ion:arrow-back"
          class="tw-text-2xl tw-text-accent-primary"
        />
      </a>
      <h1>
        {{ $t('index.title.share') }}
      </h1>
    </template>

    <card-container>
      <qr-share />
    </card-container>
  </layout-checker>
</template>

<script setup lang="ts">
import { useSetupStore } from '../stores'

definePageMeta({
  middleware: () => {
    // without the `storeToRefs` as it's an one-time check
    const { setupState } = useSetupStore()

    if (!setupState) {
      const { $localePath } = useNuxtApp()
      return navigateTo($localePath({ name: 'index' }))
    }
  },
})

const setupStore = useSetupStore()
const { resetSetupState } = setupStore
</script>
