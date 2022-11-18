<template>
  <checker-layout>
    <template #title>
      <client-only>
        <template v-if="connectUri">
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

        <h1 v-else>
          {{ $t('index.title.setup') }}
        </h1>

        <template #fallback>
          <h1>
            {{ $t('index.title.setup') }}
          </h1>
        </template>
      </client-only>
    </template>

    <client-only>
      <card-container v-if="connectUri">
        <qr-share :value="connectUri" />
      </card-container>

      <card-container v-else>
        <setup-form />
      </card-container>
    </client-only>
  </checker-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConnectionStore, useSetupStore } from '../stores'

const { reset: resetSetupState } = useSetupStore()

// Init connection things
const connectionStore = useConnectionStore()
const { connectUri } = storeToRefs(connectionStore)

onMounted(connectionStore.init)
</script>
