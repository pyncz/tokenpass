import { defineNuxtConfig } from 'nuxt'

const isProduction = !!process.env.IS_PRODUCTION

export default defineNuxtConfig({
  /*
  * Build config
  */
  typescript: {
    strict: true,
  },

  /*
   * App config
   */
  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'active-exact',
    },
  },

  runtimeConfig: {
    public: {
      isProduction,

      /**
       * Override in .env
       * NOTE: Nuxt's native syncing envs are not used because of vars' nuxt-specific prefixes
       * https://v3.nuxtjs.org/guide/features/runtime-config/#environment-variables
       */
      APP_DOMAIN: process.env.APP_DOMAIN ?? 'localhost:3000',

      INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID ?? '',
      WALLETCONNECT_PROJECT_ID: process.env.WALLETCONNECT_PROJECT_ID ?? '',
      WALLETCONNECT_RELAY_URL: process.env.WALLETCONNECT_RELAY_URL ?? 'wss://relay.walletconnect.com',
      MORALIS_API_KEY: process.env.MORALIS_API_KEY ?? '',
    },
  },

  /*
   * Modules config
   */
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  tailwindcss: {
    cssPath: '~/assets/scss/tailwind.scss',
  },

  i18n: {
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        name: 'en',
        file: 'en-US.yml',
        iso: 'en-US',
      },
      {
        code: 'ru',
        name: 'ру',
        file: 'ru-RU.yml',
        iso: 'ru-RU',
      },
    ],
    vueI18n: './i18n.config.mjs',
    strategy: 'prefix_and_default',
    lazy: true,
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n',
    },
  },
})
