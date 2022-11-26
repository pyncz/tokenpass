import { acceptHMRUpdate, defineStore } from 'pinia'
import AuthClient from '@walletconnect/auth-client'
import type { Nullable } from '@voire/type-utils'

export const useClientStore = defineStore('client', () => {
  const { error, setError } = useStoreError()

  /*
   * Client specific fields
   */
  const client = ref<Nullable<AuthClient>>(null)
  const initialized = computed(() => !!client.value)

  /*
   * Client specific methods
   */
  // Init client and listen to auth events
  const config = useRuntimeConfig()

  const {
    decoratedMethod: init,
    loading: initializing,
  } = useLoading(async () => {
    // reset error
    error.value = null

    // Init as a singleton
    if (!client.value) {
      try {
        client.value = await AuthClient.init({
          relayUrl: config.WALLETCONNECT_RELAY_URL,
          projectId: config.WALLETCONNECT_PROJECT_ID,
          metadata: {
            name: 'tokenpass',
            description: 'Using the unique power of blockchain',
            url: window.location.host,
            icons: [`${window.location.origin}/img/tokenpass.png`],
          },
        })
      } catch (e) {
        setError(e)
      }
    }
  })

  return {
    client,
    initialized,
    initializing,

    error,

    init,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useClientStore, import.meta.hot))
}
