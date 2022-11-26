<template>
  <nuxt-link
    :to="localePath({ name: 'about', hash: '#walletconnect' })"
    class="status tw-min-w-[7.5rem]"
    role="button"
    :title="$t('tooltips.initializing')"
    :class="{
      'tw-opacity-muted': !!error,
    }"
  >
    <span
      class="beacon"
      :class="{
        'tw-animate-spin': initializing,
        'before:tw-animate-ping': initialized,
      }"
    />

    <transition name="fade" mode="out-in">
      <span v-if="initialized" class="tw-flex-1 tw-text-dim-2 tw-px-1">{{ $t('status.initialized') }}</span>
      <span v-else-if="error" class="tw-flex-1 tw-text-state-error tw-px-1">{{ $t('errors.initializationError') }}</span>
      <span v-else class="tw-flex-1 tw-text-dim-2 tw-px-1">{{ $t('status.initializing') }}</span>
    </transition>
  </nuxt-link>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useClientStore } from '../stores'

const { initialized, initializing, error } = storeToRefs(useClientStore())
const localePath = useLocalePath()
</script>

<style scoped lang="scss">
  .status {
    @apply tw-px-2.5 tw-py-2 tw-text-center tw-duration-onhover-fast tw-rounded-full tw-bg-dim-1 hover:tw-bg-dim-2 tw-flex-center-y tw-gap-0.5;
    .beacon {
      @apply tw-duration-fast tw-circle-[0.75em] tw-inline-flex tw-bg-white tw-relative tw-bg-beacon;
      @apply before:tw-opacity-muted before:tw-absolute before:tw-inset-0 before:tw-rounded-full before:tw-bg-beacon;
    }
  }
</style>
