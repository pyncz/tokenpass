<template>
  <vee-form class="tw-space-y-form" @submit="submit">
    <div class="tw-space-y-form-fields">
      <form-field
        v-model="chainId"
        name="chainId"
        rules="required|integer|min_value:1"
        :visible-name="$t('fields.chainId')"
      >
        <template #label="{ id, meta: { valid } }">
          <div class="tw-flex">
            <label :for="id" class="field-meta tw-label">
              {{ $t('setup.fields.chainId.label') }}
            </label>
          </div>
          <lazy-chain-representation v-if="valid" :chain-id="chainId" />
        </template>
        <template #default="{ handleChange, value, id }">
          <lib-autocomplete
            :id="id"
            :model-value="value"
            :options="networks"
            :placeholder="$t('setup.fields.chainId.placeholder')"
            @update:model-value="handleChange"
          >
            <template #option="{ option, selected }">
              <div class="tw-relative">
                <span v-if="selected" class="tw-top-1/2 tw--translate-y-1/2 tw-absolute tw--left-6 tw-flex"><icon name="ion:checkmark-circle" /></span>
                <chain-representation :chain-id="option.value" />
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
              {{ $t('setup.fields.address.label') }}
            </label>
          </div>
          <lazy-collection-representation
            v-if="chainId && valid"
            :address="value"
            :chain-id="chainId"
          />
        </template>
        <template #default="{ field }">
          <lib-input
            v-bind="field"
            :placeholder="$t('setup.fields.address.placeholder')"
          />
        </template>
      </form-field>

      <lib-disclosure :message="$t('setup.disclosure')">
        <div class="tw-space-y-4">
          <form-field
            v-slot="{ field }"
            name="tokenId"
            :rules="setupTokenId ? { required: setupTokenId, integer: true, min_value: 1 } : undefined"
            :label="$t('setup.fields.tokenId.label')"
            :visible-name="$t('fields.tokenId')"
          >
            <div class="field-row">
              <lib-switch v-model="setupTokenId" class="tw-mt-1" />
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
      </lib-disclosure>
    </div>

    <button class="tw-button-primary tw-w-full">
      {{ $t('setup.submit') }}
    </button>
  </vee-form>
</template>

<script setup lang="ts">
import { Form as VeeForm } from 'vee-validate'
import type { SetupForm } from '../../models'
import { useSetupStore } from '../../stores'

const networks = Object.entries(chainNamesMap).map(([id, info]) => ({
  value: +id,
  info,
}))

const setupTokenId = ref(false)
const setupAmount = ref(false)

const chainId = ref(networks[0].value)

const submit = (payload: unknown) => {
  let form = payload as SetupForm
  form = {
    ...form,
    tokenId: setupTokenId.value ? form.tokenId : undefined,
    amount: setupAmount.value ? form.amount : undefined,
  }

  const setupStore = useSetupStore()
  setupStore.setSetupForm(form)

  // move to qr generation
}
</script>

<style scoped lang="scss">
  .field-row {
    @apply tw-flex tw-gap-y-1.5 tw-gap-x-2.5;
  }
</style>
