<template>
  <div>
    About

    <div>
      Just some account's address
      <token-details address="0xBA4128162B58e511a40DB166517FC6Cbdd54B098" />
    </div>

    <div>
      USDC ERC20 Token
      <token-details address="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" />
    </div>

    <div>
      USDT ERC20 Token (Tether)
      <token-details address="0xdAC17F958D2ee523a2206206994597C13D831ec7" />
    </div>

    <div>
      TheMerge ERC721
      <token-details address="0xE42caD6fC883877A76A26A16ed92444ab177E306" />
    </div>

    <div>
      Cool Cats FC ERC721
      <token-details address="0xad27c6Ef1C2E37A78514a9e54f5C35a8BF51601D" />
    </div>

    <div>
      OKXFootballCup ERC1155
      <token-details address="0x5c891d76584b46bC7F1E700169a76569Bb77d2Db" />
    </div>

    <div>
      parallel ERC1155
      <token-details address="0x76BE3b62873462d2142405439777e971754E8E77" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'side',
})
</script>
