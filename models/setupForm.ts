import type { HexString } from './hex'

export interface SetupForm {
  chainId: number
  address: HexString
  tokenId?: number
  amount?: number
}
