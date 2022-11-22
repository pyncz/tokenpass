<template>
  <div class="tw-flex-col tw-flex-center-y tw-text-center tw-space-y-8 xs:tw-p-8 lg:tw-p-2 lg:tw-pt-12">
    <qr-share v-if="connectUri" :value="connectUri" />
    <div v-else>
      Generating connect link...
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConnectionStore } from '../../stores'

const connectionStore = useConnectionStore()
const { connectUri } = storeToRefs(connectionStore)
</script>
