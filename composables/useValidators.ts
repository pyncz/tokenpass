import { createI18nMessage, helpers, integer, minValue, required } from '@vuelidate/validators'
import { isEthAddress } from '@voire/eth-validation-rules'
import type { MaybeRef } from '@vueuse/core'

export function useValidators() {
  const { t } = useI18n()

  const ethAddress = {
    $validator: (v: string) => !helpers.req(v) || isEthAddress(v),
    $message: 'The value is not a valid ethereum address',
  }

  const positive = {
    $validator: (v: number | string) => !helpers.req(v) || (+v > 0),
    $message: 'The value should be a positive number',
  }

  const withI18nMessage = createI18nMessage({ t })

  return {
    required: withI18nMessage(required),
    integer: withI18nMessage(integer),
    minValue: (min: MaybeRef<number>) => withI18nMessage(minValue(min)),

    ethAddress: withI18nMessage(ethAddress),
    positive: withI18nMessage(positive),
  }
}
