import type { Nullable } from '@voire/type-utils'

export enum ContractInterface {
  IERC165 = 'IERC165',

  IERC721 = 'IERC721',
  IERC721Metadata = 'IERC721Metadata',

  IERC1155 = 'IERC1155',
  IERC1155MetadataURI = 'IERC1155MetadataURI',

  IERC20 = 'IERC20',
}

export const ContractInterfaceId: Record<ContractInterface, string> = {
  [ContractInterface.IERC165]: '0x01ffc9a7',

  [ContractInterface.IERC721]: '0x80ac58cd',
  [ContractInterface.IERC721Metadata]: '0x5b5e139f',

  [ContractInterface.IERC1155]: '0xd9b67a26',
  [ContractInterface.IERC1155MetadataURI]: '0x0e89341c',

  [ContractInterface.IERC20]: '0x36372b07',
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
