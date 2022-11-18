export interface AbiArg {
  internalType: string
  name: string
  type: string
}

export interface AbiMethod {
  name: string
  type: string
  inputs: AbiArg[]
  outputs: AbiArg[]
  stateMutability: string
}

export type Abi = AbiMethod[]
