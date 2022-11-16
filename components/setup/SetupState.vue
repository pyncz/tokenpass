<template>
  <div v-if="setupState" class="tw-callout tw-text-sm tw-text-dim-2">
    <pre>
      {{ JSON.stringify(setupState) }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSetupStore } from '../../stores'

const { setupState } = storeToRefs(useSetupStore())
</script>
