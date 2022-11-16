import type { ArgumentsType } from '@vueuse/core'

type Method = (...args: any[]) => any

export function useLoading<T extends Method>(method: T) {
  const loading = ref(false)

  const decoratedMethod: T = (async (...args: ArgumentsType<T>) => {
    loading.value = true
    const res = await method(...args)
    loading.value = false

    return res
  }) as T

  return {
    loading,
    decoratedMethod,
  }
}
