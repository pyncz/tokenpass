import type { MaybeRef } from '@vueuse/core'
import type { providers } from 'ethers'
import { Contract } from 'ethers'
import type { Nullable } from '@voire/type-utils'
import { toRefs as refToRefs } from '@vueuse/core'
import { ContractInterfaceId, ContractType } from '../models'
import type { ContractInterface, HexString } from '../models'
import { ERC165Abi, ERC20Abi, WHITE_ADDRESS } from '../utils'

type InterfacesMap = Record<`is${ContractInterface}`, boolean>

export function useContractTypes(
  address: MaybeRef<Nullable<HexString>>,
  provider: MaybeRef<Nullable<providers.InfuraProvider>>,
) {
  const {
    isContract,
    evaluating: evaluatingIsContractCheck,
  } = useAddressCode(address, provider)

  const evaluatingInterfacesCheck = ref(false)

  const defaultInterfaces: InterfacesMap = {
    isIERC165: false,
    isIERC721: false,
    isIERC721Metadata: false,
    isIERC1155: false,
    isIERC1155MetadataURI: false,
    isIERC20: false,
  }
  const interfacesMap = computedAsync<InterfacesMap>(
    async () => {
      const interfaces = { ...defaultInterfaces }
      const addressValue = unref(address)
      const providerValue = unref(provider)

      if (isContract.value && providerValue && addressValue) {
        // It's a contract!
        try {
          // Let's check if the contract supports ERC-165
          // @see https://eips.ethereum.org/EIPS/eip-165#how-to-detect-if-a-contract-implements-erc-165
          const maybeErc165Contract = new Contract(addressValue, ERC165Abi, providerValue)

          // Check if it's actually ERC-165
          const isIERC165 = await maybeErc165Contract.supportsInterface(ContractInterfaceId.IERC165)
          if (isIERC165) {
            interfaces.isIERC165 = true

            // Check if it's also other interfaces with the `supportsInterface` method
            return {
              ...interfaces,
              isIERC721: await maybeErc165Contract.supportsInterface(ContractInterfaceId.IERC721),
              isIERC721Metadata: await maybeErc165Contract.supportsInterface(ContractInterfaceId.IERC721Metadata),
              isIERC1155: await maybeErc165Contract.supportsInterface(ContractInterfaceId.IERC1155),
              isIERC1155MetadataURI: await maybeErc165Contract.supportsInterface(ContractInterfaceId.IERC1155MetadataURI),

              // In case it's unusual ERC-20 and implements IERC-165 as well
              isIERC20: await maybeErc165Contract.supportsInterface(ContractInterfaceId.IERC20),
            }
          }
        } catch (e) {
          // So, it's not ERC-721 or ERC-1155, and not necessarily even ERC-165
          // But there's still a chance that is's an ERC20 contract
          const maybeErc20Contract = new Contract(addressValue, ERC20Abi, providerValue)

          // Check if it has essential ERC-20 method
          try {
            // TODO: Use more explicit check
            await maybeErc20Contract.balanceOf(WHITE_ADDRESS)

            // No errors thrown, so the contract is probably ERC-20
            return {
              ...interfaces,
              isIERC20: true,
            }
          } catch (e) {
            return interfaces
          }
        }
      }

      return interfaces
    },
    defaultInterfaces,
    {
      evaluating: evaluatingInterfacesCheck,
    },
  )

  const evaluating = computed(
    () => evaluatingIsContractCheck.value || evaluatingInterfacesCheck.value,
  )

  const type = computed(() => {
    switch (true) {
      case interfacesMap.value.isIERC721:
        return ContractType.ERC721
      case interfacesMap.value.isIERC1155:
        return ContractType.ERC1155
      case interfacesMap.value.isIERC20:
        return ContractType.ERC20
      default:
        return null
    }
  })

  return {
    type,
    isContract,

    // NOTE: Not just vue native `toRefs` as it would unwrap just `.value` property
    ...refToRefs(interfacesMap),

    evaluating,
  }
}
