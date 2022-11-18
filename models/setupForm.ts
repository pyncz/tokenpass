import type { HexString } from './hex'

export interface SetupForm {
  chainId: number
  address: HexString
  tokenId: string
  amount: string
}

export interface SetupState {
  chainId: number
  address: HexString
  tokenId?: number
  amount?: number
}

export const setupStateMapper = (form: SetupForm): SetupState => ({
  chainId: form.chainId,
  address: form.address as HexString,
  tokenId: +form.tokenId,
  amount: +form.amount,
})
