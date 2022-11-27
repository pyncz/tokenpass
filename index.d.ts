declare module '@nuxt/schema' {
  interface RuntimeConfig {
    public: {
      BASE_URL: string
      WALLETCONNECT_RELAY_URL: string

      // TODO: Move on private level?
      INFURA_PROJECT_ID: string
      WALLETCONNECT_PROJECT_ID: string
    }
  }
}

export {}
