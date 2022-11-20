import { assert, describe, test } from 'vitest'
import { setup } from '@nuxt/test-utils-edge'
import { EthereumAccountAddresses, EthereumNftAddresses } from '../fixtures'

describe('useAddressCode', async () => {
  await setup()
  const provider = useInfuraProvider('0x1')

  test('says random account\'s address is not a contract', () => {
    const { evaluating, isContract } = useAddressCode(
      EthereumAccountAddresses[0],
      provider,
    )
    watchOnce(evaluating, () => {
      if (!evaluating.value) {
        assert.isFalse(isContract.value)
      }
    })
  })

  test('says random nft is a contract', () => {
    const { evaluating, isContract } = useAddressCode(
      EthereumNftAddresses[0],
      provider,
    )
    watchOnce(evaluating, () => {
      if (!evaluating.value) {
        assert.isTrue(isContract.value)
      }
    })
  })
})
