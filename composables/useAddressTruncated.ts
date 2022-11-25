import type { MaybeRef } from '@vueuse/core'
import truncate from 'smart-truncate'
import type { HexString } from '../models'

export function useAddressTruncated(
  address: MaybeRef<HexString>,
) {
  const addressTruncated = computed(() => truncate(unref(address), 12, { position: 7 }))

  return addressTruncated
}
