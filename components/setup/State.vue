<template>
  <div v-if="setupForm" class="tw-callout tw-text-sm tw-text-dim-2">
    <pre>
      {{ setupForm }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { useSetupStore } from '~~/stores'

const { setupForm } = useSetupStore()
</script>
