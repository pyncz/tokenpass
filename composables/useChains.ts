import type { ChainID, ChainInfoById } from '../models'

export const chainNamesMap: Record<ChainID, ChainInfoById> = {
  1: {
    label: 'Ethereum Mainnet',
  },
  5: {
    label: 'Goerli Testnet',
    test: true,
  },
  137: {
    label: 'Polygon Mainnet',
  },
  80001: {
    label: 'Matic Mumbai Testnet',
    test: true,
  },
  11155111: {
    label: 'Sepolia',
  },
  56: {
    label: 'BSC',
  },
  97: {
    label: 'BSC Testnet',
    test: true,
  },
  43114: {
    label: 'Avalanche',
  },
  43113: {
    label: 'Avalanche Testnet',
    test: true,
  },
  250: {
    label: 'Fantom',
  },
  25: {
    label: 'Cronos',
  },
  338: {
    label: 'Cronos Testnet',
    test: true,
  },
  42161: {
    label: 'Arbitrum',
  },
  421613: {
    label: 'Arbitrum Testnet',
    test: true,
  },
}
