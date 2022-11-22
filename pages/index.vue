<template>
  <checker-layout>
    <template #title>
      <client-only>
        <template v-if="setupState">
          <h1 class="tw-relative">
            <div class="tw-absolute tw-w-0 tw-left-2.5 tw--top-2 tw-flex-center">
              <return-button @click="resetSetupState()" />
            </div>
            <span class="tw-ml-10">{{ $t('index.title.share') }}</span>
          </h1>
        </template>

        <h1 v-else>
          {{ $t('index.title.setup') }}
        </h1>
      </client-only>
    </template>

    <card-container>
      <client-only>
        <lazy-qr-section v-if="setupState" />
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
</script>
