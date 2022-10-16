<template>
  <vee-form @submit="submit">
    <div class="tw-space-y-4">
      <form-field
        v-slot="{ field }"
        name="chainId"
        rules="required|integer|min_value:1"
        :label="$t('setup.fields.chainId.label')"
        :visible-name="$t('fields.chainId')"
      >
        <lib-autocomplete
          v-bind="field"
          :options="networks"
          :placeholder="$t('setup.fields.chainId.placeholder')"
        />
      </form-field>

      <form-field
        v-slot="{ field }"
        name="address"
        rules="required|eth_address"
        :label="$t('setup.fields.address.label')"
        :visible-name="$t('fields.collectionAddress')"
      >
        <lib-input
          v-bind="field"
          :placeholder="$t('setup.fields.address.placeholder')"
        />
      </form-field>

      <form-field
        v-slot="{ field }"
        name="tokenId"
        :rules="setupTokenId ? { required: setupTokenId, integer: true, min_value: 1 } : undefined"
        :label="$t('setup.fields.tokenId.label')"
        :visible-name="$t('fields.tokenId')"
      >
        <div class="field-row">
          <lib-switch v-model="setupTokenId" class="tw-mt-1" />
          <lib-switch v-model="setupTokenId" disabled class="tw-mt-1" />
          <lib-input
            v-bind="field"
            class="tw-flex-1"
            :placeholder="$t('setup.fields.tokenId.placeholder')"
            :disabled="!setupTokenId"
          />
        </div>
      </form-field>

      <form-field
        v-slot="{ field }"
        name="amount"
        :rules="setupAmount ? { required: setupAmount, integer: true, min_value: 1 } : undefined"
        :label="$t('setup.fields.amount.label')"
        :visible-name="$t('fields.amount')"
      >
        <div class="field-row">
          <lib-switch v-model="setupAmount" class="tw-mt-1" />
          <lib-input
            v-bind="field"
            class="tw-flex-1"
            :placeholder="$t('setup.fields.amount.placeholder')"
            :disabled="!setupAmount"
          />
        </div>
      </form-field>
    </div>
    <button class="tw-button tw-button-primary">
      {{ $t('setup.submit') }}
    </button>
    <button class="tw-button tw-button-secondary">
      {{ $t('setup.submit') }}
    </button>
  </vee-form>
</template>

<script setup lang="ts">
import { Form as VeeForm } from 'vee-validate'
import type { SetupForm } from '../models'
// import { useSetupStore } from '../stores'

const networks = [
  {
    value: 1,
    label: 'Ethereum Mainnet',
  },
  {
    value: 5,
    label: 'Goerli Testnet',
  },
]

const setupTokenId = ref(false)
const setupAmount = ref(false)

const submit = (payload: Partial<SetupForm>) => {
  console.log({
    ...payload,
    tokenId: setupTokenId.value ? payload.tokenId : undefined,
    amount: setupAmount.value ? payload.amount : undefined,
  })
  // const setupStore = useSetupStore()
  // setupStore.setSetupForm()
}
</script>

<style scoped lang="scss">
  .field-row {
    @apply tw-flex tw-gap-y-1.5 tw-gap-x-2.5;
  }
</style>
