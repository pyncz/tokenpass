declare module '@nuxt/schema' {
  interface RuntimeConfig {
    public: {
      API_BASE: string
      API_BASE_WS: string

      // TODO: Move on private level?
      INFURA_PROJECT_ID: string
      WALLETCONNECT_PROJECT_ID: string
    }
  }
}

export {}
