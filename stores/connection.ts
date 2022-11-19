import { acceptHMRUpdate, defineStore, skipHydrate, storeToRefs } from 'pinia'
import AuthClient, { generateNonce } from '@walletconnect/auth-client'
import type { Nullable } from '@voire/type-utils'
import { useSetupStore } from './setup'

export const useConnectionStore = defineStore('connection', () => {
  /*
   * Use selected chains in order to re-request
   */
  const { setupState } = storeToRefs(useSetupStore())
  const chain = computed(() => setupState.value
    ? `eip155:${+setupState.value?.chainId}`
    : null,
  )

  /*
   * Connection specific things
   */
  const connectUri = useLocalStorage<Nullable<string>>('uri', null)

  const client = ref<Nullable<AuthClient>>(null)
  const initialized = computed(() => !!client.value)

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

  watch(client, () => {
    if (!client.value) {
      return
    }
    client.value.on('auth_response', ({ params }) => {
      if ('code' in params) {
        return setError(params.message)
      }
      if ('error' in params) {
        return setError(params.error)
      }
      const address = params.result.p.iss.split(':')[4]

      // check if the address ownes the token
      console.log(`check if the address "${address}" ownes the token`)
      console.log(chain.value, setupState.value?.address)
    })
  })

  const reset = () => {
    connectUri.value = null
    error.value = null
  }

  watch(chain, async () => {
    if (chain.value) {
      if (!client.value) {
        return
      }
      // New chain, re-request connection
      const { uri } = await client.value.request({
        aud: window.location.href,
        domain: window.location.hostname.split('.').slice(-2).join('.'),
        chainId: chain.value,
        type: 'eip4361',
        nonce: generateNonce(),
        statement: 'Sign in with wallet.',
      })
      connectUri.value = uri
    } else {
      // Chain has been reset, clear connection state
      reset()
    }
  })

  return {
    // Skip hydration from init state
    // as need to init only on the client side from localStorage
    connectUri: skipHydrate(connectUri),
    initialized,
    error,

    init,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConnectionStore, import.meta.hot))
}
