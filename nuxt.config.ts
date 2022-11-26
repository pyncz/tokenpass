const isProduction = !!process.env.IS_PRODUCTION

export default defineNuxtConfig({
  /*
  * Build config
  */
  typescript: {
    strict: true,
  },

  css: ['~/assets/scss/main.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
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

      WALLETCONNECT_PROJECT_ID: process.env.WALLETCONNECT_PROJECT_ID ?? '',
      WALLETCONNECT_RELAY_URL: process.env.WALLETCONNECT_RELAY_URL ?? 'wss://relay.walletconnect.com',
      INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID ?? '',
    },
  },

  /*
   * Modules config
   */
  modules: [
    '@nuxt/content',
    'nuxt-icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n-edge',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    ['nuxt-proxy', {
      options: {
        target: 'https://gateway.pinata.cloud/ipfs/',
        changeOrigin: true,
        pathFilter: [
          '^ipfs://',
        ],
        // pathFilter: (path, req) => {
        //   return path.match('^/api') && req.method === 'GET';
        // },
      },
    }],

    // perfomance
    '@nuxtjs/critters',
    '@nuxtjs/fontaine',
  ],

  i18n: {
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        name: 'en',
        file: 'en-US.yml',
        iso: 'en-US',
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
