<template>
  <vee-form @submit="submit">
    <div class="tw-space-y-4">
      <form-field
        v-slot="{ handleChange }"
        name="chainId"
        type="number"
        rules="required|integer|min_value:1"
        :label="$t('setup.fields.chainId.label')"
      >
        <lib-autocomplete
          v-model="form.chainId"
          :placeholder="$t('setup.fields.chainId.placeholder')"
          @update:model-value="handleChange"
        />
      </form-field>

      <form-field
        v-slot="{ handleChange }"
        name="address"
        rules="required|eth_address"
        :label="$t('setup.fields.address.label')"
      >
        <lib-input
          v-model="form.address"
          :placeholder="$t('setup.fields.address.placeholder')"
          @change="handleChange"
        />
      </form-field>

      <div class="tw-form-group">
        <lib-switch v-model="setupTokenId" />
        <form-field
          name="tokenId"
          type="number"
          :rules="{ required: setupTokenId, integer: true, min_value: 1 }"
          :label="$t('setup.fields.tokenId.label')"
        >
          <lib-input v-model="form.tokenId" :placeholder="$t('setup.fields.tokenId.placeholder')" :disabled="!setupTokenId" />
        </form-field>
      </div>

      <div class="tw-form-group">
        <lib-switch v-model="setupAmount" />
        <form-field
          name="amount"
          type="number"
          :rules="{ required: setupAmount, integer: true, min_value: 1 }"
          :label="$t('setup.fields.amount.label')"
        >
          <lib-input v-model="form.amount" :placeholder="$t('setup.fields.amount.placeholder')" :disabled="!setupAmount" />
        </form-field>
      </div>
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

const setupTokenId = ref(false)
const setupAmount = ref(false)

const form: Partial<SetupForm> = {
  chainId: 1,
}

const submit = (payload: Partial<SetupForm>) => {
  console.log(payload)
  // const setupStore = useSetupStore()
  // setupStore.setSetupForm()
}
</script>
