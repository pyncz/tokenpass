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
              v-if="!!form.chainId && chainIdValid"
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

      <lazy-form-section
        v-if="contractSpecified"
        v-bind="contractSectionAttributes"
        class="tw-text-7/8"
      >
        <div v-if="evaluatingContractCheck">
          <lazy-loading-spinner />
        </div>

        <div
          v-else-if="contractType"
          v-bind="{ contractType }"
          class="tw-space-y-form-fields"
        >
          <contract-preview-labeled v-if="isIERC721 && isIERC721Metadata" type="ERC-721">
            <lazy-erc721-contract-preview
              :chain-id="form.chainId"
              :address="form.address"
            />
          </contract-preview-labeled>
          <contract-preview-labeled v-if="isIERC20" type="ERC-20">
            <lazy-erc20-contract-preview
              :chain-id="form.chainId"
              :address="form.address"
            />
          </contract-preview-labeled>

          <lazy-form-field
            v-if="isNftContract"
            :errors="v.tokenId.$errors"
          >
            <template #label="{ id }">
              <div class="tw-flex">
                <label :for="id" class="field-meta tw-label">
                  {{ $t('index.fields.tokenId.label') }}
                </label>
              </div>

              <template v-if="validTokenId">
                <lazy-erc721-token-preview
                  v-if="isIERC721 && isIERC721Metadata"
                  :chain-id="form.chainId"
                  :address="form.address"
                  :token-id="validTokenId"
                />
                <lazy-erc1155-token-preview
                  v-if="isIERC1155 && isIERC1155MetadataURI"
                  :chain-id="form.chainId"
                  :address="form.address"
                  :token-id="validTokenId"
                />
              </template>
            </template>
            <template #default="{ id }">
              <lib-input
                :id="id"
                v-model="form.tokenId"
                :placeholder="$t('index.fields.tokenId.placeholder')"
                :disabled="loading"
              />
            </template>
          </lazy-form-field>

          <lazy-form-field
            :errors="v.amount.$errors"
          >
            <template #label="{ id }">
              <div>
                <div class="tw-flex">
                  <label :for="id" class="field-meta tw-label">
                    {{ $t('index.fields.amount.label') }}
                  </label>
                </div>

                <div v-if="isIERC1155" class="tw-text-xs tw-pb-1">
                  <lazy-lib-markdown :value="$t('index.fields.amount.description.ERC1155')" />
                  <span v-if="tokenIdValid && !!form.tokenId" class="tw-px-0.5">({{ form.tokenId }})</span>
                </div>
              </div>
            </template>
            <template #default="{ id }">
              <template v-if="isIERC20">
                <lazy-erc20-input
                  v-if="decimals"
                  :id="id"
                  v-model="form.amount"
                  :decimals="decimals"
                  :disabled="loading"
                />
              </template>
              <lazy-lib-input
                v-else
                :id="id"
                v-model="form.amount"
                :placeholder="$t('index.fields.amount.placeholder')"
                :disabled="loading || (isIERC721 && !!form.tokenId)"
              />
            </template>
          </lazy-form-field>
        </div>

        <div v-else class="tw-space-y-2">
          <div v-if="isContract">
            {{ $t('contractCheck.unknown') }}
          </div>
          <div v-else>
            {{ $t('contractCheck.noCode') }}
          </div>

          <lazy-lib-markdown
            :value="$t('contractCheck.disclaimer')"
            class="tw-block tw-text-7/8 tw-text-dim-2 tw-pb-1"
          />
        </div>
      </lazy-form-section>
    </div>

    <lib-button
      type="submit"
      class="tw-button-primary tw-w-full"
      :disabled="disableSubmit"
    >
      {{ $t('index.submit') }}
    </lib-button>
  </form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { toRefs as refToRefs } from '@vueuse/core'
import { setupStateMapper } from '../../models'
import type { HexString, SetupForm } from '../../models'
import { useSetupStore } from '../../stores'

// Setup form
const { ethAddress, integer, positive, required } = useValidators()

const form = reactive<SetupForm>({
  chainId: 1,
  address: '' as HexString,
  tokenId: '',
  amount: 1,
})

const { chainId, address } = toRefs(form)

const provider = useRpcProvider(chainId)

const {
  evaluating: evaluatingContractCheck,
  isContract,
  type: contractType,
  isIERC721,
  isIERC721Metadata,
  isIERC1155,
  isIERC1155MetadataURI,
  isIERC20,
} = useContractInterfaces(
  address,
  provider,
)

// Get decimals if it's an ERC-20, and use it in its amount input
const {
  metadata: erc20Metadata,
} = useErc20Metadata(address, provider)

const { decimals } = refToRefs(erc20Metadata)

// Validation things
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

const validTokenId = computed(() => tokenIdValid.value ? form.tokenId : null)

const contractSpecified = computed(() =>
  chainIdValid.value && addressValid.value
    // just value checks are included
    // in order to avoid a flash before the validation rules are applied
    && chainId.value && address.value,
)

watchEffect(() => {
  // Set checked amount to 1, if it's an ERC-721 with tokenId specified
  if (tokenIdValid.value && form.tokenId && isIERC721.value) {
    form.amount = 1
  }
})

// Style contract section if it's an NFT
const isNftContract = computed(() => isIERC721.value || isIERC1155.value)

const contractSectionAttributes = computed(() => {
  return isNftContract.value && !evaluatingContractCheck.value
    ? {
        style: {
          '--bg-color': '63,182,253',
          '--bg-opacity': 'var(--o-bg-form-section)',
          '--border-color': '63,182,253',
          '--border-opacity': 'var(--o-border-form-section)',
        },
      }
    : {}
})

// Submit
const loading = ref(false)

const unsuitableContract = computed(() => contractSpecified.value && !contractType.value)
const disableSubmit = computed(
  () => loading.value || unsuitableContract.value || evaluatingContractCheck.value,
)

const submit = async () => {
  // Resume if the field are valid AND the provided contract has suitable type
  if (await v.value.$validate() && !disableSubmit.value) {
    loading.value = true

    const { setSetupState } = useSetupStore()
    setSetupState(setupStateMapper(form))

    loading.value = false
  }
}
</script>
