<template>
  <div class="tw-text-xs tw-space-y-3 sm:tw-space-y-4 tw-text-dim-2 tw-leading-sm">
    <div class="tw-space-y-2">
      <lib-markdown class="tw-block" :value="$t('summary.body.0')" />
      <lib-markdown class="tw-block" :value="$t('summary.body.1')" />
    </div>

    <div>
      <nuxt-link :to="localePath({ name: 'about' })">
        {{ $t('actions.readMore') }}
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
