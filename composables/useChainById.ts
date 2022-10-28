import type { MaybeRef } from '@vueuse/core'
import { chainNamesMap } from './useChains'
import type { HexString } from '~~/models'

/**
 * Returns set of details for a chain by provided chainID
 *
 * @param id ChainID (string, hex-string or a number)
 *
 * @returns hexId, intId, chainName
 */
export function useChainById(id: MaybeRef<string | number>) {
  const intId = computed(() => {
    const idValue = unref(id)
    return typeof idValue === 'number'
      ? idValue
      : +idValue
  })

  const hexId = computed<HexString>(() => `0x${intId.value.toString(16)}`)
  const chainName = computed(() => chainNamesMap[intId.value])

  return {
    hexId,
    intId,
    chainName,
  }
}
