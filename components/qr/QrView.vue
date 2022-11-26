<template>
  <transition name="fade" mode="out-in">
    <div v-if="initialized" class="tw-flex tw-flex-col tw-p-8 lg:tw-p-2">
      <transition name="fade" mode="out-in">
        <lazy-qr-share v-if="connectUri" :value="connectUri" class="tw-flex-1" />

        <lazy-qr-section v-else-if="generating" loading class="tw-flex-1">
          {{ $t('status.generating') }}...
        </lazy-qr-section>
        <lazy-qr-section v-else class="tw-flex-1">
          <lib-button class="tw-button-primary" @click="generate()">
            {{ $t('actions.generateConnectionLink') }}
          </lib-button>
        </lazy-qr-section>
      </transition>
    </div>

    <lazy-qr-section v-else-if="initializationError" class="tw-p-8 lg:tw-p-2">
      {{ $t('errors.initializationError') }}
    </lazy-qr-section>
    <lazy-qr-section v-else loading class="tw-p-8 lg:tw-p-2">
      {{ $t('status.initializing') }}...
    </lazy-qr-section>
  </transition>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useClientStore, useConnectionStore } from '../../stores'

const { initialized, error: initializationError } = storeToRefs(useClientStore())

const connectionStore = useConnectionStore()
const { generate } = connectionStore
const { connectUri, generating } = storeToRefs(connectionStore)
</script>
