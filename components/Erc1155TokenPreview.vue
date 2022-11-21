<template>
  <token-preview
    :chain-id="chainId"
    :address="address"
    :token-id="tokenId"
    :abi="IERC1155MetadataAbi"
    :uri-getter="getErc1155TokenUri"
  />
</template>

<script setup lang="ts">
import type { Contract } from 'ethers'
import { IERC1155MetadataAbi, callWithFallback } from '../utils'
import type { ChainID, HexString } from '../models'

defineProps<{
  chainId?: ChainID
  address: HexString
  tokenId?: string | number
}>()

const getErc1155TokenUri = (contract: Contract, id: string) => callWithFallback<string>(() => contract.uri(id))
</script>
