import type { MaybeRef } from '@vueuse/core'

/**
 * Perform provided effect once if value is a simple argument
 * and register a watcher if it's a ref.
 *
 * @param source Source value or its ref
 * @param effect Effect to perform
 *
 * @returns `undefined` in case of a simple `value` argument
 * and a `WatchStopHandle` in case of ref provided
 */
export function useEffect<T = any>(
  source: MaybeRef<T>,
  effect: () => void,
) {
  if (isRef(source)) {
    return watchEffect(effect)
  } else {
    effect()
  }
}
