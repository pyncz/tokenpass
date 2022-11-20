<template>
  <span v-if="symbol || name" class="tw-inline-flex tw-items-center tw-h-6">
    <span v-if="name">{{ name }}</span>
    <code v-if="symbol" class="tw-mx-0.5">{{ symbol }}</code>
  </span>
</template>

<script setup lang="ts">
import type { Nullable } from '@voire/type-utils'

defineProps<{
  name: Nullable<string>
  symbol: Nullable<string>
}>()
</script>
