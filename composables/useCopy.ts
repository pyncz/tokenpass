import type { MaybeRef } from '@vueuse/core'

export function useCopy(
  value: MaybeRef<string>,
) {
  const message = refAutoReset('Copy to clipboard', 1000)

  const copy = async () => {
    await navigator.clipboard.writeText(unref(value))
    message.value = 'Copied!'
  }

  return {
    message,
    copy,
  }
}
