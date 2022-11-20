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
            <select-chain
              :id="id"
              v-model="form.chainId"
              :disabled="loading"
            />
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

      <form-section
        v-if="contractSpecified"
        v-bind="contractSectionAttributes"
        class="tw-text-7/8"
      >
        <div v-if="evaluatingContractCheck">
          <loading-spinner />
        </div>

        <div
          v-else-if="contractType"
          v-bind="{ contractType }"
          class="tw-space-y-form-fields"
        >
          <erc721-token-preview v-if="isIERC721" />
          <erc1155-token-preview v-else-if="isIERC1155" />
          <erc20-token-preview v-else-if="isIERC20" />

          <form-field
            v-if="isNftContract"
            v-slot="{ id }"
            :label="$t('index.fields.tokenId.label')"
            :error="v.tokenId.$errors"
          >
            <lib-input
              :id="id"
              v-model="form.tokenId"
              class="tw-flex-1"
              :placeholder="$t('index.fields.tokenId.placeholder')"
              :disabled="loading"
            />
          </form-field>

          <form-field
            :error="v.amount.$errors"
          >
            <template #label="{ id }">
              <div class="tw-flex">
                <label :for="id" class="field-meta tw-label">
                  {{ $t('index.fields.amount.label') }}
                </label>
              </div>

              <div v-if="isIERC1155">
                Amount of tokens of the provided `tokenId`
                <span v-if="tokenIdValid && form.tokenId">({{ form.tokenId }})</span>
              </div>
              <div v-else-if="isIERC20">
                In units, e.g. 1'000'000'000'000'000'000 for 1 WETH
              </div>
            </template>
            <template #default="{ id }">
              <lib-input
                :id="id"
                v-model="form.amount"
                class="tw-flex-1"
                :placeholder="$t('index.fields.amount.placeholder')"
                :disabled="loading || (isIERC721 && form.tokenId)"
              />
            </template>
          </form-field>
        </div>

        <div v-else class="tw-space-y-2">
          <p v-if="isContract">
            {{ $t('contractCheck.unknown') }}
          </p>
          <p v-else>
            {{ $t('contractCheck.noCode') }}
          </p>

          <p class="tw-text-7/8 tw-text-dim-2 tw-pb-1">
            <!-- TODO: Add refs to ERC-* specs -->
            {{ $t('contractCheck.disclaimer') }}
          </p>
        </div>
      </form-section>
    </div>

    <button
      type="submit"
      class="tw-button-primary tw-w-full"
      :disabled="disableSubmit"
    >
      {{ initialized ? $t('index.submit.ready') : $t('index.submit.initializing') }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { storeToRefs } from 'pinia'
import { setupStateMapper } from '../../models'
import type { HexString, SetupForm } from '../../models'
import { useConnectionStore, useSetupStore } from '../../stores'

// Setup form
const { ethAddress, integer, positive, required } = useValidators()

const form = reactive<SetupForm>({
  chainId: 1,
  address: '' as HexString,
  tokenId: '',
  amount: 1,
})

const { chainId, address } = toRefs(form)

const {
  evaluating: evaluatingContractCheck,
  isContract,
  type: contractType,
  isIERC721,
  isIERC1155,
  isIERC20,
} = useContractTypes(
  address,
  useInfuraProvider(chainId),
)

const tokenIdRules = computed(() => {
  switch (true) {
    case isIERC1155.value:
      return { required, integer, positive }
    case isIERC721.value:
      return { integer, positive }
    default:
      return {}
  }
})

const rules = computed(() => ({
  chainId: { required, integer, positive },
  address: { required, ethAddress },
  tokenId: tokenIdRules.value,
  amount: { integer, positive },
}))

const v = useVuelidate(rules, form)

const chainIdValid = computed(() => !v.value.chainId.$invalid)
const addressValid = computed(() => !v.value.address.$invalid)
const tokenIdValid = computed(() => !v.value.tokenId.$invalid)

const contractSpecified = computed(() =>
  chainIdValid.value && addressValid.value
    // just value checks are included
    // in order to avoid a flash before the validation rules are applied
    && chainId.value && address.value,
)

const isNftContract = computed(() => isIERC721.value || isIERC1155.value)

const contractSectionAttributes = computed(() => {
  return isNftContract.value
    ? {
        icon: '💎',
        style: {
          '--bg-color': '63,182,253',
          '--bg-opacity': 'var(--o-bg-form-section)',
          '--border-color': '63,182,253',
          '--border-opacity': 'var(--o-border-form-section)',
        },
      }
    : {}
})

watchEffect(() => {
  // Set checked amount to 1, if it's an ERC-721 with tokenId specified
  if (form.tokenId && isIERC721.value) {
    form.amount = 1
  }
})

// Submit
const { initialized } = storeToRefs(useConnectionStore())

const loading = ref(false)
const disableSubmit = computed(() => loading.value || !initialized.value || evaluatingContractCheck.value)

const submit = async () => {
  // Resume if the field are valid AND the provided contract has suitable type
  if (await v.value.$validate() && !disableSubmit.value && contractType.value) {
    loading.value = true

    const { setSetupState } = useSetupStore()
    setSetupState(setupStateMapper(form))

    loading.value = false
  }
}
</script>
