<template>
  <component
    :is="component.is"
    v-if="component"
    class="chain-icon"
    v-bind="component.attrs"
  />
  <chain-icon-default v-else class="chain-icon" />
</template>

<script setup lang="ts">
import type { Optional } from '@voire/type-utils'
import type { ChainID, DynamicComponent } from '../../../models'
const props = defineProps<{
  chainId: ChainID
}>()

const chainId = toRef(props, 'chainId')

type IconDynamicComponent = DynamicComponent<Record<string, any> & { name: string }>
function makeIcon(name: string, color?: string): IconDynamicComponent {
  return {
    is: 'icon',
    attrs: {
      name,
      style: {
        '--icon-color': color,
      },
    },
  }
}

const component = computed<Optional<DynamicComponent>>(() => {
  switch (+chainId.value) {
    case 1:
    case 5:
      return makeIcon('cryptocurrency:eth', 'var(--c-chain-ethereum)')
    case 137:
    case 80001:
      return makeIcon('cryptocurrency:matic', 'var(--c-chain-polygon)')
    case 56:
    case 97:
      return makeIcon('cryptocurrency:bnb', 'var(--c-chain-bsc)')
    case 43114:
    case 43113:
      return makeIcon('cryptocurrency:avax', 'var(--c-chain-avalanche)')
    default:
      // 11155111, 250, 25, 338, 42161, 421613
      return undefined
  }
})
</script>

<style scoped lang="scss">
  .chain-icon {
    @apply tw-text-custom tw-circle-[1em];
    --text-color: var(--icon-color, var(--c-bg-dim-2));
    box-shadow: 0 0 0.5em rgb(var(--text-color), 0.5);
  }
</style>
