<template>
  <checker-layout>
    <template #title>
      <client-only>
        <template v-if="setupState">
          <h1 class="tw-relative tw-mb-2">
            <div class="tw-absolute tw-w-0 tw-left-2.5 tw--top-2 tw-flex-center">
              <return-button @click="resetSetupState()" />
            </div>
            <span class="tw-ml-10">{{ $t('index.title.share') }}</span>
          </h1>
        </template>

        <h1 v-else class="tw-mb-2">
          {{ $t('index.title.setup') }}
        </h1>
      </client-only>
    </template>

    <card-container>
      <client-only>
        <lazy-qr-section v-if="setupState" class="md:tw-min-h-[18rem]" />
        <lazy-setup-form v-else />
      </client-only>
    </card-container>
  </checker-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConnectionStore, useSetupStore } from '../stores'

const setupStore = useSetupStore()
const { reset: resetSetupState } = setupStore
const { setupState } = storeToRefs(setupStore)

// Init connection things
const connectionStore = useConnectionStore()
onMounted(connectionStore.init)

// Head
const { t } = useI18n()

useHead({
  title: ` / ${t('pages.index.title')}`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: t('pages.index.description'),
    },
  ],
})
</script>
