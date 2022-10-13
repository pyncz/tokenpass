<template>
  <div class="tw-space-8">
    <h1>
      {{ $t('setup.title') }}
    </h1>
    <setup-form />

    <lib-dialog v-model:opened="openDialog" title="yo sup">
      Content

      <template #controls>
        <button class="tw-button tw-button-primary">
          Open
        </button>
      </template>
    </lib-dialog>
    <button class="tw-button" @click="openDialog = true">
      Open
    </button>
  </div>
</template>

<script setup lang="ts">
const openDialog = ref(false)
</script>
