<template>
  <div class="tw-px-4 md:tw-mt-3 tw-py-3 tw-rounded tw-bg-dim-1 sm:tw-p-0 sm:tw-bg-opacity-0">
    <lazy-lib-disclosure v-if="smScreen">
      <template #toggle>
        <summary-title show-icon />
      </template>
      <summary-content class="tw-pt-3" />
    </lazy-lib-disclosure>

    <div v-else class="tw-space-y-3">
      <summary-title />
      <summary-content />
    </div>
  </div>
</template>

<script setup lang="ts">
const breakpoints = useTailwindBreakpoints()
const smScreen = breakpoints.smallerOrEqual('sm')
</script>
