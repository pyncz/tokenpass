import type { Nullable } from '@voire/type-utils'
import type { Ref } from 'vue'

export function useStoreError<T extends string | object = string | object>() {
  const error: Ref<Nullable<T>> = ref(null)

  const setError = (e: unknown) => {
    error.value = (e as Nullable<T>) ?? null
    console.error(e)
  }

  return {
    error,
    setError,
  }
}
