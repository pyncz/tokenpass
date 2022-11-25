<template>
  <div class="mask-wrapper tw-blur-px tw-inline-flex">
    <div class="result-icon" :class="{ successful }" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  successful?: boolean
}>()
</script>

<style scoped lang="scss">
.mask-wrapper {
  mask-image: radial-gradient(100% 100% at 65% 35%, black, rgba(0,0,0,1) 60%);
}
  .result-icon {
    @apply tw-size-32 tw-relative before:tw-absolute before:tw-inset-0 before:tw-bg-beacon before:tw-bg-center before:tw-mix-blend-difference;
    animation: chameleon 4s linear infinite alternate-reverse;
    &::before {
      animation: tw-spin 12s linear infinite, gleaming 5s linear infinite alternate-reverse;
    }
    &:not(.successful) {
      mask-image: url('/img/results/false.svg');
    }
    &.successful {
      mask-image: url('/img/results/true.svg');
    }

    @keyframes chameleon {
      0% {
        background-color: #cc4c4c;
      }
      25% {
        background-color: #4c983a;
      }
      50% {
        background-color: #5faab9;
      }
      75% {
        background-color: #6d2ac3;
      }
      100% {
        background-color: #f72249;
      }
    }

    @keyframes gleaming {
      0% {
        background-size: 100%;
      }
      100% {
        background-size: 200%;
      }
    }
  }
</style>
