<template>
  <form-section>
    <div v-if="evaluating">
      Loading...
    </div>
    <slot v-else-if="contractType" v-bind="{ contractType }">
      {{ contractType }}
    </slot>
    <div v-else-if="isContract">
      Unknown type of the contract
    </div>
    <div v-else>
      Not a contract
    </div>
  </form-section>
</template>

<script setup lang="ts">
import type { ChainID, HexString } from '../models'

interface Props {
  chainId?: ChainID
  address: HexString
}

const props = withDefaults(defineProps<Props>(), {
  chainId: '0x1',
})
const { chainId, address } = toRefs(props)

const {
  evaluating,
  isContract,
  type: contractType,
} = useContractTypes(address, useInfuraProvider(chainId))
</script>
