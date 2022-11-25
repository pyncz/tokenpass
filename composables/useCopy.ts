import type { Optional } from '@voire/type-utils'
import type { MaybeRef } from '@vueuse/core'

export function useCopy(
  value: MaybeRef<string>,
  options?: {
    defaultMessage?: MaybeRef<Optional<string>>
    copiedMessage?: MaybeRef<Optional<string>>
  },
) {
  const { t } = useI18n()
  const justCopied = refAutoReset(false, 1000)

  const defaultMessage = computed(() => {
    const rawMessage = unref(options?.defaultMessage)
    return rawMessage ?? unref(value)
  })

  const copiedMessage = computed(() => {
    const rawMessage = unref(options?.copiedMessage)
    return rawMessage ?? t('feedback.copied')
  })

  const message = computed(() => {
    return justCopied.value
      ? copiedMessage.value
      : defaultMessage.value
  })

  const copy = async () => {
    await navigator.clipboard.writeText(unref(value))
    justCopied.value = true
  }

  return {
    message,
    justCopied,
    copy,
  }
}
