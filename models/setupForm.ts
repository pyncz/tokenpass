import type { HexString } from './hex'
import type { ChainID } from './web3'

export interface SetupForm {
  chainId: ChainID
  address: HexString
  tokenId: string | number
  amount: string | number
}

export interface SetupState {
  chainId: ChainID
  address: HexString
  tokenId?: number
  amount?: number
}

export const setupStateMapper = (form: SetupForm): SetupState => ({
  chainId: form.chainId!,
  address: form.address!,
  tokenId: +form.tokenId,
  amount: +form.amount,
})
