import type { ChainID, ChainInfoById } from '../models'

export const chainInfoMap: Record<ChainID, ChainInfoById> = {
  // Ethereum
  1: {
    label: 'Ethereum Mainnet',
    rpcDomain: 'mainnet',
  },
  5: {
    label: 'Goerli Testnet',
    rpcDomain: 'goerli',
    test: true,
  },
  11155111: {
    label: 'Sepolia Testnet',
    rpcDomain: 'sepolia',
    test: true,
  },

  // Celo
  42220: {
    label: 'Celo',
    rpcDomain: 'celo-mainnet',
  },
  44787: {
    label: 'Celo Alfajores Testnet',
    rpcDomain: 'celo-alfajores',
    test: true,
  },

  // Polygon
  137: {
    label: 'Polygon',
    rpcDomain: 'polygon-mainnet',
  },
  80001: {
    label: 'Matic Mumbai Testnet',
    rpcDomain: 'polygon-mumbai',
    test: true,
  },

  // Avalanche
  43114: {
    label: 'Avalanche C-Chain',
    rpcDomain: 'avalanche-mainnet',
  },
  43113: {
    label: 'Avalanche Fuji Testnet',
    rpcDomain: 'avalanche-fuji',
    test: true,
  },

  // Palm
  11297108109: {
    label: 'Palm',
    rpcDomain: 'palm-mainnet',
  },
  11297108099: {
    label: 'Palm Testnet',
    rpcDomain: 'palm-testnet',
    test: true,
  },

  // Optimism
  10: {
    label: 'Optimism',
    rpcDomain: 'optimism-mainnet',
  },
  420: {
    label: 'Optimism Goerli Testnet',
    rpcDomain: 'optimism-goerli',
    test: true,
  },

  // Arbitrum
  42161: {
    label: 'Arbitrum One',
    rpcDomain: 'arbitrum-mainnet',
  },
  421613: {
    label: 'Arbitrum Goerli Testnet',
    rpcDomain: 'arbitrum-goerli',
    test: true,
  },

  // Aurora
  1313161554: {
    label: 'Aurora',
    rpcDomain: 'aurora-mainnet',
  },
  1313161555: {
    label: 'Aurora Testnet',
    rpcDomain: 'aurora-testnet',
  },

  // TODO: Add networks?
  //   56: 'BSC',
  //   97: 'BSC Testnet',
  //   250: 'Fantom',
  //   25: 'Cronos',
  //   338: 'Cronos Testnet'
}
