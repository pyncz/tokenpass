<template>
  <a class="a-link" :href="href" v-bind="blankProps"><slot />
    <icon class="icon" name="open" /></a>
</template>

<script setup lang="ts">
interface Props {
  href: string
  blank?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  blank: false,
})

const blank = toRef(props, 'blank')
const blankProps = computed(
  () => blank.value
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {},
)
</script>

<style scoped lang="scss">
  .a-link {
    .icon {
      @apply tw-opacity-soft tw-relative tw-left-0.5;
    }
  }
</style>
