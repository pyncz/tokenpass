import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { generateNonce } from '@walletconnect/auth-client'
import type { Nullable } from '@voire/type-utils'
import type { HexString } from '../models'
import { useSetupStore } from './setup'
import { useClientStore } from './client'

export const useConnectionStore = defineStore('connection', () => {
  const { error, setError } = useStoreError()
  const { client } = storeToRefs(useClientStore())

  const { setupState } = storeToRefs(useSetupStore())

  /*
   * Connection specific fields
   */
  const connectUri = ref<Nullable<string>>(null)
  const address = ref<Nullable<HexString>>(null)

  // Listen for connections
  watch(client, () => {
    if (client.value) {
      client.value.on('auth_response', ({ params }) => {
        if ('code' in params) {
          return setError(params)
        }
        if ('error' in params) {
          return setError(params)
        }
        address.value = params.result.p.iss.split(':')[4] as HexString
      })
    }
  }, { immediate: true })

  // Reset specific connected client's data
  const reset = () => {
    address.value = null
    connectUri.value = null
    error.value = null
  }

  // Generate connection link to consume by a checkee
  const chain = computed(() => setupState.value
    ? `eip155:${+setupState.value.chainId}`
    : null,
  )

  const {
    decoratedMethod: generate,
    loading: generating,
  } = useLoading(async () => {
    // Reset old stored connection link if exists
    reset()

    // Generate a new one
    if (chain.value && client.value) {
      const { uri } = await client.value.request({
        aud: window.location.href,
        domain: window.location.hostname.split('.').slice(-2).join('.'),
        chainId: chain.value,
        nonce: generateNonce(),
        statement: 'Sign in with wallet.',
      })
      connectUri.value = uri
    }
  })

  // Immediately generate on client is initialized
  // + re-generate on specified token is changed
  const canGenerate = computed(() => !!client.value && !!setupState.value)
  watch(canGenerate, () => {
    if (client.value && setupState.value) {
      generate()
    } else {
      reset()
    }
  }, { immediate: true })

  // Waiting for user to connect with the shared link
  const pending = computed(() => !!connectUri.value && !address.value)

  return {
    connectUri,
    address,

    generate,
    reset,

    error,

    pending,
    generating,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConnectionStore, import.meta.hot))
}
