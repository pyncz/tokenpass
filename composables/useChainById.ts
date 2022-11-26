import type { MaybeRef } from '@vueuse/core'
import { chainInfoMap } from '../utils'
import type { ChainID } from '../models'

/**
 * Returns set of details for a chain by provided chainID
 *
 * @param id ChainID (string, hex-string or a number)
 *
 * @returns hexId, intId, chainInfo
 */
export function useChainById(id: MaybeRef<ChainID>) {
  const intId = computed(() => {
    let idValue = unref(id)
    if (typeof idValue === 'number') {
      return idValue
    } else {
      // string
      idValue = +idValue
      if (!isNaN(idValue)) {
        return idValue
      }
    }
  })

  const hexId = computed(() => intId.value ? `0x${intId.value.toString(16)}` : undefined)
  const chainInfo = computed(() => intId.value ? chainInfoMap[intId.value] : undefined)

  return {
    hexId,
    intId,
    chainInfo,
  }
}
