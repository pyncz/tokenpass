<template>
  <token-preview
    :chain-id="chainId"
    :address="address"
    :token-id="tokenId"
    :abi="IERC721MetadataAbi"
    :uri-getter="getErc721TokenUri"
  />
</template>

<script setup lang="ts">
import type { Contract } from 'ethers'
import { IERC721MetadataAbi, callWithFallback } from '../utils'
import type { ChainID, HexString } from '../models'

defineProps<{
  chainId?: ChainID
  address: HexString
  tokenId?: string | number
}>()

const getErc721TokenUri = (contract: Contract, id: string) => callWithFallback<string>(() => contract.tokenURI(id))
</script>
