import type { RawLocation, Route, RouteLocation, RouteLocationRaw } from '@intlify/vue-router-bridge'
import type { Locale } from '@intlify/vue-i18n-bridge'
import type { Optional } from '@voire/type-utils'

export type LocaleRoute = Route | (RouteLocation & { href: string })

export type RouteResolver = (
  route: RawLocation | RouteLocationRaw,
  locale?: Locale,
) => Optional<LocaleRoute>
