<template>
  <div>
    <h4>
      How to?
    </h4>
    <p>
      With walletconnect
    </p>
    <nuxt-link :to="localePath({ name: 'about' })">
      Read more
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
