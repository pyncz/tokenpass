import { breakpointsTailwind } from '@vueuse/core'

/**
 * Reactively viewport breakpoints extended in tailwind's theme config
 */
export function useTailwindBreakpoints() {
  return useBreakpoints({
    ...breakpointsTailwind,

    // Extended screens ()
    // TODO: Get breakpoints right from `tailwind.config.js`
    '2xs': 320,
    'xs': 400,
  })
}
