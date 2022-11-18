import type { RawLocation, RouteLocationRaw } from '@intlify/vue-router-bridge'
import type { Locale } from '@intlify/vue-i18n-bridge'
import type { LocaleRouteFunction } from '../models'

/**
 * Redirect to a provided route or refresh the page if a provided route is already active
 */
export function useRedirectOrRefresh(
  localeRoute: LocaleRouteFunction,
) {
  return (
    route: RawLocation | RouteLocationRaw,
    locale?: Locale,
  ) => {
    const targetRoute = localeRoute(route, locale)
    if (targetRoute) {
      const currentRoute = useRoute()

      if (targetRoute.fullPath === currentRoute.fullPath) {
        window.location.reload()
      } else {
        const router = useRouter()
        router.push(targetRoute)
      }
    }
  }
}
