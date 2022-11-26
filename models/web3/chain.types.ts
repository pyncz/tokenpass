import type { HexString } from '../hex'

export type ChainID = HexString | number

export interface ChainInfoById {
  label: string
  rpcDomain: string
  test?: boolean
}

export interface ChainInfo extends ChainInfoById {
  id: ChainID
}
