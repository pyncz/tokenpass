<template>
  <checker-layout>
    <template #title>
      <client-only>
        <template v-if="setupState">
          <h1 class="tw-relative tw-mb-2">
            <div class="tw-absolute tw-w-0 tw-left-2.5 tw--top-2 tw-flex-center">
              <lazy-return-button @click="resetSetupState()" />
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
        <lazy-qr-view v-if="setupState" class="md:tw-min-h-[18rem]" />
        <lazy-setup-form v-else />

        <template #fallback>
          <div class="tw-flex-center tw-min-h-[14rem]">
            <loading-spinner />
          </div>
        </template>
      </client-only>
    </card-container>
  </checker-layout>
</template>

<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import { storeToRefs } from 'pinia'
import { useSetupStore } from '../stores'

const setupStore = useSetupStore()
const { reset: resetSetupState } = setupStore
const { setupState } = storeToRefs(setupStore)

// Head
const { t } = useI18n()

useHead({
  title: t('pages.index.title'),
})

useSeoMeta({
  ogTitle: t('pages.index.title'),
  description: t('pages.index.description'),
  ogDescription: t('pages.index.description'),
})
</script>
