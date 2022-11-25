<template>
  <qr-code
    :size="400"
    background="transparent"
    :foreground="foreground"
    class="tw-mx-auto tw-aspect-1 !tw-w-full !tw-h-auto"
    :value="value"
  />

  <copy-button
    :value="value"
    :default-message="$t('actions.copy')"
    class="sm:tw-min-w-[12em]"
  />
  <div>
    <div v-if="checking">
      {{ $t('status.checking') }}...
    </div>
  </div>

  <lazy-result-dialog
    v-if="result && address"
    v-model:opened="showResult"
    :result="result"
    :address="address"
    :show-counters="!isIERC721"
    :decimals="decimals"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import QrCode from 'qrcode.vue'
import { toRefs as refToRefs } from '@vueuse/core'
import { useCheckingStore, useConnectionStore, useContractStore, useSetupStore } from '../../stores'

const props = defineProps<{
  value: string
}>()
const { value } = toRefs(props)

const colorMode = useColorMode()
const foreground = computed(
  () => colorMode.value === Theme.dark
    ? '#fff'
    : '#000',
)

const { isIERC721 } = storeToRefs(useContractStore())
const { address } = storeToRefs(useConnectionStore())
const { checking, result } = storeToRefs(useCheckingStore())
const showResult = ref(false)

// In case of ERC-20, pass decimals into ResultDialog to format amounts
const { setupState } = storeToRefs(useSetupStore())
const chainId = computed(() => setupState.value?.chainId ?? null)

const {
  metadata: erc20Metadata,
} = useErc20Metadata(address, useInfuraProvider(chainId))

const { decimals } = refToRefs(erc20Metadata)

// Show result dialog as soon as result is defined
whenever(result, () => {
  showResult.value = true
})
</script>
