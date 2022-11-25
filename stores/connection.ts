import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import AuthClient, { generateNonce } from '@walletconnect/auth-client'
import type { Nullable } from '@voire/type-utils'
import type { HexString } from '../models'
import { useSetupStore } from './setup'

export const useConnectionStore = defineStore('connection', () => {
  /*
   * Use selected chains in order to re-request
   */
  const { setupState } = storeToRefs(useSetupStore())

  const chain = computed(() => setupState.value
    ? `eip155:${+setupState.value.chainId}`
    : null,
  )

  /*
   * Connection specific things
   */
  const client = ref<Nullable<AuthClient>>(null)
  const initialized = computed(() => !!client.value)

  const address = ref<Nullable<HexString>>(null)

  // reactive auth error
  const error = ref<Nullable<string>>(null)

  const setError = (e: unknown) => {
    error.value = e?.toString() ?? null
    console.error(e)
  }

  // Init client and listen to auth events
  const config = useRuntimeConfig()
  const init = () => {
    // Init as a singleton
    if (!client.value) {
      AuthClient.init({
        relayUrl: config.WALLETCONNECT_RELAY_URL,
        projectId: config.WALLETCONNECT_PROJECT_ID,
        metadata: {
          name: 'tokenpass',
          description: 'Using the unique power of blockchain',
          url: window.location.host,
          icons: [`${window.location.origin}/img/wc-bg.png`],
        },
      })
        .then((authClient) => {
          client.value = authClient
        })
        .catch(setError)
    }
  }

  whenever(client, (initializedClient) => {
    initializedClient.on('auth_response', ({ params }) => {
      if ('code' in params) {
        return setError(params.message)
      }
      if ('error' in params) {
        return setError(params.error)
      }
      address.value = params.result.p.iss.split(':')[4] as HexString
    })
  })

  const connectUri = computedAsync(
    async () => {
      if (chain.value && client.value) {
        // New chain, re-request connection
        const { uri } = await client.value.request({
          aud: window.location.href,
          domain: window.location.hostname.split('.').slice(-2).join('.'),
          chainId: chain.value,
          type: 'eip4361',
          nonce: generateNonce(),
          statement: 'Sign in with wallet.',
        })
        return uri
      }
      return null
    },
    null,
  )

  // Waiting for user to connect by the shared link
  const pending = computed(() => !!connectUri.value && !address.value)

  return {
    // Skip hydration from init state
    // as need to init only on the client side from localStorage
    connectUri,
    initialized,

    init,
    address,

    pending,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConnectionStore, import.meta.hot))
}
