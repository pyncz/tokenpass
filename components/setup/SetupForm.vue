<template>
  <form
    class="tw-space-y-form"
    @submit.prevent="submit"
  >
    <div class="tw-space-y-form-fields">
      <div class="tw-space-y-form-fields">
        <form-field :errors="v.chainId.$errors">
          <template #label="{ id }">
            <div class="tw-flex">
              <label :for="id" class="field-meta tw-label">
                {{ $t('index.fields.chainId.label') }}
              </label>
            </div>
            <lazy-chain-representation
              v-if="form.chainId && chainIdValid"
              :chain-id="form.chainId"
            />
          </template>
          <template #default="{ id }">
            <lib-autocomplete
              :id="id"
              v-model="form.chainId"
              :get-value="(o: ChainInfo) => o.id"
              :options="networks"
              :filter="filterNetworks"
              :placeholder="$t('index.fields.chainId.placeholder')"
              :disabled="loading"
            >
              <template #option="{ option }">
                <div class="tw-combo-option tw-relative">
                  <chain-representation :chain-id="option.id" />
                </div>
              </template>
            </lib-autocomplete>
          </template>
        </form-field>

        <form-field name="address" :label="$t('index.fields.address.label')" :errors="v.address.$errors">
          <lib-input
            v-model="form.address"
            :placeholder="$t('index.fields.address.placeholder')"
            :disabled="loading"
          />
        </form-field>
      </div>

      <div v-if="contractSpecified">
        Hey ho
      </div>

      <form-section icon="🪙">
        ERC20, yeah!
      </form-section>
      <form-section icon="💎" color="63,182,253">
        <p class="tw-mb-2 tw-font-medium tw-text-sm">
          Looks like this is an NFT!
        </p>

        <form-field
          v-slot="field"
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
              :disabled="loading || !setupTokenId"
            />
          </div>
        </form-field>
      </form-section>

      <form-section>
        <p class="tw-mb-2 tw-font-medium tw-text-sm">
          TODO: Show if it's erc20 or erc1155 (smth with amount)
        </p>

        <form-field
          v-slot="field"
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
      </form-section>
    </div>

    <button class="tw-button-primary tw-w-full" :disabled="loading">
      {{ $t('index.submit') }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import type { ChainInfo, HexString, SetupForm } from '../../models'
import { squeeze } from '../../utils'

// Select chain
const networks: ChainInfo[] = Object.entries(chainNamesMap).map(([id, info]) => ({
  id: +id,
  ...info,
}))

const filterNetworks = (options: ChainInfo[], q: string) => options.filter((option) => {
  const squeezedQuery = squeeze(q)
  return option.id.toString().includes(squeezedQuery) || squeeze(option.label).includes(squeezedQuery)
})

// Setup form
const { ethAddress, integer, positive, required } = useValidators()

const form = reactive<SetupForm>({
  chainId: +networks[0].id,
  address: '' as HexString,
})
const rules = computed(() => ({
  chainId: { required, integer, positive },
  address: { required, ethAddress },
}))

const v = useVuelidate(rules, form)

const chainIdValid = computed(() => !v.value.chainId.$invalid)
const addressValid = computed(() => !v.value.address.$invalid)

const contractSpecified = computed(
  // just value checks are included in order to avoid a flash before the validation rules are applied
  () => form.chainId && chainIdValid.value && form.address && addressValid.value,
)

// Enable additional config
const setupTokenId = ref(false)
const setupAmount = ref(false)

// Submit
const { decoratedMethod: submit, loading } = useLoading(async () => {
  console.log(form)
  if (await v.value.$validate()) {
    const payload = {
      ...form,
      tokenId: setupTokenId.value ? form.tokenId : undefined,
      amount: setupAmount.value ? form.amount : undefined,
    }
    console.log(payload)
  }

  // const { initConnectionRequest } = useSetupStore()
  // await initConnectionRequest(form)
})
</script>

<style scoped lang="scss">
  .field-row {
    @apply tw-flex tw-gap-y-1.5 tw-gap-x-2.5;
  }
</style>
