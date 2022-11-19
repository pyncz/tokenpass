<template>
  <form
    class="tw-space-y-form"
    @submit.prevent="submit"
    @change="v.$validate()"
  >
    <div class="tw-space-y-form-fields">
      <div class="tw-space-y-form-fields">
        <form-field
          :errors="v.chainId.$errors"
        >
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

        <form-field
          v-slot="{ id }"
          :label="$t('index.fields.address.label')"
          :errors="v.address.$errors"
        >
          <lib-input
            :id="id"
            v-model="form.address"
            :placeholder="$t('index.fields.address.placeholder')"
            :disabled="loading"
          />
        </form-field>
      </div>

      <token-details
        v-if="contractSpecified"
        v-slot="{ contractType }"
        :chain-id="form.chainId"
        :address="form.address"
      >
        Hey'ya
        {{ contractType }}
      </token-details>

      <form-section icon="💎" color="63,182,253">
        <p class="tw-mb-2 tw-font-medium tw-text-sm">
          Looks like this is an NFT!
        </p>

        <form-field
          v-slot="{ id }"
          :label="$t('index.fields.tokenId.label')"
          :error="v.tokenId.$errors"
        >
          <div class="field-row">
            <lib-switch
              v-model="setupTokenId"
              class="tw-mt-1"
              :disabled="loading"
            />
            <lib-input
              :id="id"
              v-model="form.tokenId"
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
          v-slot="{ id }"
          :label="$t('index.fields.amount.label')"
          :error="v.amount.$errors"
        >
          <div class="field-row">
            <lib-switch
              v-model="setupAmount"
              class="tw-mt-1"
              :disabled="loading"
            />
            <lib-input
              :id="id"
              v-model="form.amount"
              class="tw-flex-1"
              :placeholder="$t('index.fields.amount.placeholder')"
              :disabled="loading || !setupAmount"
            />
          </div>
        </form-field>
      </form-section>
    </div>

    <button
      type="submit"
      class="tw-button-primary tw-w-full"
      :disabled="!initialized || loading"
    >
      {{ initialized ? $t('index.submit.ready') : $t('index.submit.initializing') }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { storeToRefs } from 'pinia'
import { setupStateMapper } from '../../models'
import type { ChainInfo, HexString, SetupForm } from '../../models'
import { useConnectionStore, useSetupStore } from '../../stores'

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

// Enable additional config
const setupTokenId = ref(false)
const setupAmount = ref(false)

const form = ref<SetupForm>({
  chainId: +networks[0].id,
  address: '' as HexString,
  tokenId: '',
  amount: '',
})

const rules = computed(() => ({
  chainId: { required, integer, positive },
  address: { required, ethAddress },
  tokenId: setupTokenId.value
    ? { required, integer, positive }
    : {},
  amount: setupAmount.value
    ? { required, integer, positive }
    : {},
}))

const v = useVuelidate(rules, form)

const chainIdValid = computed(() => !v.value.chainId.$invalid)
const addressValid = computed(() => !v.value.address.$invalid)

const contractSpecified = computed(() =>
  chainIdValid.value && addressValid.value
    // just value checks are included
    // in order to avoid a flash before the validation rules are applied
    && form.value.chainId && form.value.address,
)

// Submit
const { initialized } = storeToRefs(useConnectionStore())

const { decoratedMethod: submit, loading } = useLoading(async () => {
  if (await v.value.$validate()) {
    const payload: SetupForm = {
      ...form.value,
      tokenId: setupTokenId.value ? form.value.tokenId : '',
      amount: setupAmount.value ? form.value.amount : '',
    }

    const { setSetupState } = useSetupStore()
    setSetupState(setupStateMapper(payload))
  }
})
</script>

<style scoped lang="scss">
  .field-row {
    @apply tw-flex tw-gap-y-1.5 tw-gap-x-2.5;
  }
</style>
