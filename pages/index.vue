<template>
  <layout-checker :title="$t('setup.title')">
    <div class="tw-form tw-space-8">
      <setup-form />

      <lib-dialog v-model:opened="openDialog" title="yo sup">
        Content

        <template #controls>
          <button class="tw-button-primary">
            Open
          </button>
        </template>
      </lib-dialog>

      <qr-code value="don't be angry" />

      <button class="tw-button" @click="openDialog = true">
        Open
      </button>
    </div>
  </layout-checker>
</template>

<script setup lang="ts">
import QrCode from 'qrcode.vue'

const openDialog = ref(false)
</script>
