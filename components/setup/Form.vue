<template>
  <vee-form class="tw-space-y-form" @submit="submit">
    <div class="tw-space-y-form-fields">
      <form-field
        v-model="chainId"
        name="chainId"
        :rules="chainIdValidationRules"
        :visible-name="$t('fields.chainId')"
      >
        <template #label="{ id, meta: { valid } }">
          <div class="tw-flex">
            <label :for="id" class="field-meta tw-label">
              {{ $t('index.fields.chainId.label') }}
            </label>
          </div>
          <lazy-chain-representation v-if="valid" :chain-id="chainId" />
        </template>
        <template #default="{ handleChange, value, id }">
          <lib-autocomplete
            :id="id"
            :model-value="value"
            :get-value="(o: ChainInfo) => o.id"
            :options="networks"
            :filter="filterNetworks"
            :placeholder="$t('index.fields.chainId.placeholder')"
            @update:model-value="handleChange"
          >
            <template #option="{ option }">
              <div class="tw-combo-option tw-relative">
                <chain-representation :chain-id="option.id" />
              </div>
            </template>
          </lib-autocomplete>
        </template>
      </form-field>

      <form-field
        name="address"
        rules="required|eth_address"
        :visible-name="$t('fields.collectionAddress')"
      >
        <template #label="{ id, value, meta: { valid } }">
          <div class="tw-flex">
            <label :for="id" class="field-meta tw-label">
              {{ $t('index.fields.address.label') }}
            </label>
          </div>

          <lazy-collection-representation
            v-if="chainId && validChainId && valid"
            :address="value"
            :chain-id="chainId"
          />
        </template>
        <template #default="{ field }">
          <lib-input
            v-bind="field"
            :placeholder="$t('index.fields.address.placeholder')"
          />
        </template>
      </form-field>

      <lib-disclosure :message="$t('index.disclosure')">
        <div class="tw-space-y-4">
          <form-field
            v-slot="{ field }"
            name="tokenId"
            :rules="setupTokenId ? { required: setupTokenId, integer: true, min_value: 1 } : undefined"
            :label="$t('index.fields.tokenId.label')"
            :visible-name="$t('fields.tokenId')"
          >
            <div class="field-row">
              <lib-switch v-model="setupTokenId" class="tw-mt-1" />
              <lib-input
                v-bind="field"
                class="tw-flex-1"
                :placeholder="$t('index.fields.tokenId.placeholder')"
                :disabled="!setupTokenId"
              />
            </div>
          </form-field>

          <form-field
            v-slot="{ field }"
            name="amount"
            :rules="setupAmount ? { required: setupAmount, integer: true, min_value: 1 } : undefined"
            :label="$t('index.fields.amount.label')"
            :visible-name="$t('fields.amount')"
          >
            <div class="field-row">
              <lib-switch v-model="setupAmount" class="tw-mt-1" />
              <lib-input
                v-bind="field"
                class="tw-flex-1"
                :placeholder="$t('index.fields.amount.placeholder')"
                :disabled="!setupAmount"
              />
            </div>
          </form-field>
        </div>
      </lib-disclosure>
    </div>

    <button class="tw-button-primary tw-w-full">
      {{ $t('index.submit') }}
    </button>
  </vee-form>
</template>

<script setup lang="ts">
import { Form as VeeForm, validate } from 'vee-validate'
import type { ChainInfo, SetupForm } from '../../models'
import { useSetupStore } from '../../stores'
import { squeeze } from '../../utils'

const networks: ChainInfo[] = Object.entries(chainNamesMap).map(([id, info]) => ({
  id: +id,
  ...info,
}))

const filterNetworks = (options: ChainInfo[], q: string) => options.filter((option) => {
  const squeezedQuery = squeeze(q)
  return option.id.toString().includes(squeezedQuery) || squeeze(option.label).includes(squeezedQuery)
})

const setupTokenId = ref(false)
const setupAmount = ref(false)

const chainIdValidationRules = 'required|integer|min_value:1'
const chainId = ref(networks[0].id)
const validChainId = computedAsync(async () => {
  return (await validate(chainId.value, chainIdValidationRules)).valid
}, false)

const submit = (payload: unknown) => {
  let form = payload as SetupForm
  form = {
    ...form,
    tokenId: setupTokenId.value ? form.tokenId : undefined,
    amount: setupAmount.value ? form.amount : undefined,
  }

  const { setSetupState } = useSetupStore()
  setSetupState(form)

  // move to qr generation
}
</script>

<style scoped lang="scss">
  .field-row {
    @apply tw-flex tw-gap-y-1.5 tw-gap-x-2.5;
  }
</style>
