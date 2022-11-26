<template>
  <lazy-lib-dialog v-if="result" v-model:opened="model">
    <div class="tw-text-center tw-flex-center-y tw-flex-col">
      <result-icon :successful="result.passed" class="tw-my-2" />

      <div class="tw-max-w-full tw-w-full sm:tw-w-auto tw-flex-center-y tw-flex-col tw-gap-2">
        <div>
          <h2 class="tw-mb-3">
            {{ result.passed ? $t('result.passed.title') : $t('result.failed.title') }}
          </h2>
          <p class="tw-text-dim-2">
            {{ description }}
          </p>
        </div>

        <copy-button
          :value="address"
          :default-message="addressTruncated"
        />

        <div v-if="showCounters" class="tw-flex-center tw-pt-2 tw-gap-4 sm:tw-gap-5">
          <result-attribute
            v-if="commifiedRequiredAmount"
            :value="commifiedRequiredAmount"
            :label="$t('result.attributes.amount')"
          />
          <result-attribute
            v-if="commifiedBalance"
            :value="commifiedBalance"
            :label="$t('result.attributes.balance')"
          />
        </div>
      </div>
    </div>

    <template #actions="{ close }">
      <lib-button class="tw-button-secondary" @click="closeAndFinishChecking(close)">
        {{ $t('actions.backToSetup') }}
      </lib-button>
      <lib-button class="tw-button-primary" @click="close()">
        {{ $t('actions.ok') }}
      </lib-button>
    </template>
  </lazy-lib-dialog>
</template>

<script setup lang="ts">
import type { Nullable } from '@voire/type-utils'
import { toRefs as refToRefs } from '@vueuse/core'
import type { CheckOwnershipResults, HexString } from '../../models'

interface Props {
  opened: boolean
  result: CheckOwnershipResults
  address: HexString
  showCounters?: boolean
  decimals?: Nullable<number>
}

const props = withDefaults(defineProps<Props>(), {
  decimals: null,
})

const emit = defineEmits<{
  (event: 'update:opened', opened: boolean): void
  (event: 'finish'): void
}>()

const model = useVModel(props, 'opened', emit)
const { address, result, decimals } = toRefs(props)

// Display checkee account's address
const addressTruncated = useAddressTruncated(address)

// Not just close results, but return to setup contract
const closeAndFinishChecking = (closeDialog: () => void) => {
  emit('finish')
  closeDialog()
}

// Display result's amounts
const { balance, required } = refToRefs(result)
const { commified: commifiedBalance } = useTokenAmount(balance, decimals)
const { commified: commifiedRequiredAmount } = useTokenAmount(required, decimals)

const { t } = useI18n()
const description = computed(() => {
  return props.result.passed
    ? t('result.passed.message', props.result.required)
    : t('result.failed.message', props.result.balance)
})
</script>
