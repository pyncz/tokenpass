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

    <card-container v-if="connectUri">
      <qr-share :value="connectUri" />
    </card-container>
  </layout-checker>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSetupStore } from '../stores'

definePageMeta({
  middleware: () => {
    // without the `storeToRefs` as it's an one-time check
    const { connectUri } = useSetupStore()

    if (!connectUri) {
      const { $localePath } = useNuxtApp()
      return navigateTo($localePath({ name: 'index' }))
    }
  },
})

const setupStore = useSetupStore()
const { $reset: resetSetupState } = setupStore
const { connectUri } = storeToRefs(setupStore)

// Redirect on the setup page if the setup data is erased
// NOTE: Not just on Back click since the setup may be removed from localStorage
watch(connectUri, () => {
  const router = useRouter()
  const localePath = useLocalePath()
  router.push(localePath({ name: 'index' }))
})
</script>
