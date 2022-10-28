import type { Nullable } from '@voire/type-utils'

export type ContractType = 'ERC1155' | 'ERC721'

export interface CollectionMetadata {
  token_address: string
  name: Nullable<string>
  symbol: Nullable<string>
  contract_type: ContractType
}
