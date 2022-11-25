import type { Nullable } from '@voire/type-utils'

export interface CheckOwnershipResults {
  required: number
  balance: number
  passed: boolean
  tokenId?: Nullable<number>
}
