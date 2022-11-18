import type { Nullable } from '@voire/type-utils'

export enum ContractInterfaceId {
  IERC165 = '0x01ffc9a7', // bytes4(keccak256('supportsInterface(bytes4)'))
  IERC1155 = '0xd9b67a26',
  IERC721 = '0x80ac58cd',
}

export enum ContractType {
  ERC1155 = 'ERC1155',
  ERC721 = 'ERC721',
  ERC20 = 'ERC20',
}

export interface CollectionMetadata {
  token_address: string
  name: Nullable<string>
  symbol: Nullable<string>
  contract_type: ContractType
}

export interface Erc20Metadata {
  name: string
  symbol: string
}
