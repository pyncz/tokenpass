<template>
  <div class="tw-flex-col tw-flex-center-y tw-text-center tw-space-y-8 lg:tw-pt-8">
    <qr-code
      :size="400"
      background="transparent"
      :foreground="foreground"
      class="tw-mx-auto tw-aspect-1 !tw-w-full !tw-h-auto tw-duration-fast tw-origin-top"
      :class="{ 'tw-scale-[0.9]': checking }"
      :value="value"
    />

    <div class="tw-gap-y-2 tw-gap-x-3 tw-flex-wrap tw-flex-center tw-flex-col sm:tw-flex-row">
      <copy-button
        :value="value"
        :default-message="$t('actions.copy')"
      />
      <lib-button
        class="tw-button-primary tw-free-button"
        @click="generate()"
      >
        <span class="tw-flex tw-text-7/8">{{ $t('generate.renew') }}</span>
      </lib-button>
    </div>

    <div v-if="connectionError" class="tw-text-sm tw-text-state-error">
      {{ connectionError }}
    </div>

    <div v-if="checking" class="tw-text-dim-1">
      {{ $t('status.checking') }}
    </div>

    <lazy-result-dialog
      v-if="result && address"
      v-model:opened="showResult"
      :result="result"
      :address="address"
      :show-counters="!isIERC721"
      :decimals="decimals"
      @close="resetConnection"
      @finish="resetSetupState"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import QrCode from 'qrcode.vue'
import { toRefs as refToRefs } from '@vueuse/core'
import { useCheckingStore, useConnectionStore, useSetupStore } from '../../stores'

const props = defineProps<{
  value: string
}>()
const { value } = toRefs(props)

const connectionStore = useConnectionStore()
const { generate, reset: resetConnection } = connectionStore
const { address, error: connectionError } = storeToRefs(connectionStore)

const setupStore = useSetupStore()
const { reset: resetSetupState } = setupStore
const { setupState, isIERC721 } = storeToRefs(setupStore)

// In case of ERC-20, pass decimals into ResultDialog to format amounts
const chainId = computed(() => setupState.value?.chainId ?? null)

const {
  metadata: erc20Metadata,
} = useErc20Metadata(address, useInfuraProvider(chainId))

const { decimals } = refToRefs(erc20Metadata)

// Show result dialog as soon as result is defined
const { checking, result } = storeToRefs(useCheckingStore())
const showResult = ref(false)

whenever(result, () => {
  showResult.value = true
})

// QR code theming
const colorMode = useColorMode()
const foreground = computed(
  () => colorMode.value === Theme.dark
    ? '#fff'
    : '#000',
)
</script>
