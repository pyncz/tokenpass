<template>
  <div v-if="setupState" class="tw-py-2 tw-callout tw-text-sm tw-text-dim-2 tw-divide-y tw-divide-separator-muted">
    <with-label :label="$t('state.chain')" class="tw-py-3">
      <lazy-chain-representation
        :chain-id="setupState.chainId"
      />
    </with-label>

    <with-label v-if="!isIERC1155" :label="$t('state.contract')" class="tw-py-3">
      <lazy-erc721-contract-preview
        v-if="isIERC721 && isIERC721Metadata"
        :chain-id="setupState.chainId"
        :address="setupState.address"
      />
      <lazy-erc20-contract-preview
        v-if="isIERC20"
        :chain-id="setupState.chainId"
        :address="setupState.address"
      />
    </with-label>

    <with-label v-if="setupState.tokenId" :label="$t('state.token')" class="tw-py-3">
      <lazy-erc721-token-preview
        v-if="isIERC721 && isIERC721Metadata"
        :chain-id="setupState.chainId"
        :address="setupState.address"
        :token-id="setupState.tokenId"
      />
      <lazy-erc1155-token-preview
        v-if="isIERC1155 && isIERC1155MetadataURI"
        :chain-id="setupState.chainId"
        :address="setupState.address"
        :token-id="setupState.tokenId"
      />
    </with-label>

    <with-label :label="$t('state.amount')" class="tw-py-3">
      {{ setupState.amount }}
    </with-label>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSetupStore } from '../../stores'

const {
  setupState,
  isIERC1155,
  isIERC1155MetadataURI,
  isIERC20,
  isIERC721,
  isIERC721Metadata,
} = storeToRefs(useSetupStore())
</script>
