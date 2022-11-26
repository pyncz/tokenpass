import { providers } from 'ethers'

const { JsonRpcProvider: EthersJsonRpcProvider } = providers

export type IJsonRpcProvider = InstanceType<typeof JsonRpcProvider>

export class JsonRpcProvider extends EthersJsonRpcProvider {
  constructor(url: string, chainId?: number) {
    super(url, chainId)
  }
}
