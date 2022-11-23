import type { Nullable } from '@voire/type-utils'
import type { MaybeRef } from '@vueuse/core'
import { BigNumber, ethers } from 'ethers'

export function useTokenAmount(
  amount: MaybeRef<Nullable<number | string | BigNumber>>,
  decimals: MaybeRef<Nullable<number>>,
) {
  const formatted = computed(() => {
    const decimalsValue = unref(decimals)
    const amountValue = unref(amount)

    return amountValue
      ? decimalsValue
        ? BigNumber
          .from(amountValue)
          .mul(BigNumber.from(10).pow(decimalsValue))
          .toString()
        : amountValue.toString()
      : null
  })

  const commified = computed(
    () => formatted.value ? ethers.utils.commify(formatted.value) : null,
  )

  return {
    formatted,
    commified,
  }
}
