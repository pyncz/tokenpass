import type { MaybeRef } from '@vueuse/core'

/**
 * Make string like `2022-2023`, from provided year till the current one
 * or just year if they are the same.
 *
 * @param start Year to start from (a number or a ref)
 *
 * @returns Years string
 */
export function useYearsFrom(
  start: MaybeRef<number>,
) {
  const currentYear = new Date().getFullYear()
  const startYear = unref(start)
  return startYear + (currentYear > startYear ? `-${currentYear}` : '')
}
