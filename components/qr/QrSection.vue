<template>
  <div class="tw-flex tw-flex-col tw-p-8 lg:tw-p-2">
    <transition name="fade" mode="out-in">
      <div v-if="connectUri" class="tw-flex-col tw-flex-center-y tw-text-center tw-space-y-8 lg:tw-pt-8">
        <qr-share :value="connectUri" />
      </div>
      <div v-else class="tw-text-center tw-gap-3 tw-flex-1 tw-flex-center tw-flex-col">
        <lazy-loading-spinner class="tw-text-xl" />

        <div class="tw-text-dim-2 tw-text-sm tw-pb-2">
          <template v-if="initialized">
            {{ $t('status.generating') }}...
          </template>
          <template v-else>
            {{ $t('status.initializing') }}...
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConnectionStore } from '../../stores'

const connectionStore = useConnectionStore()
const { connectUri, initialized } = storeToRefs(connectionStore)
</script>
