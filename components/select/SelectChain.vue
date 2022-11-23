<template>
  <lib-autocomplete
    :id="id"
    v-model="model"
    :get-value="(o: ChainInfo) => o.id"
    :options="networks"
    :filter="filterNetworks"
    :placeholder="$t('index.fields.chainId.placeholder')"
    :disabled="disabled"
  >
    <template #option="{ option }">
      <div class="tw-combo-option tw-relative">
        <chain-representation :chain-id="option.id" />
      </div>
    </template>
  </lib-autocomplete>
</template>

<script setup lang="ts">
import type { ChainID, ChainInfo } from '../../models'

const props = defineProps<{
  modelValue: ChainID
  id?: string
  disabled?: boolean
}>()

const networks: ChainInfo[] = Object.entries(chainNamesMap).map(([id, info]) => ({
  id: +id,
  ...info,
}))

const filterNetworks = (options: ChainInfo[], q: string) => options.filter((option) => {
  const squeezedQuery = squeeze(q)
  return option.id.toString().includes(squeezedQuery) || squeeze(option.label).includes(squeezedQuery)
})

const model = useVModel(props, 'modelValue', undefined, {
  defaultValue: +networks[0].id,
})
</script>
