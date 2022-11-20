<template>
  <div v-html="content" />
</template>

<script setup lang="ts">
import { micromark } from 'micromark'

const props = defineProps<{
  value: string
}>()

const content = computed(() => micromark(props.value))
</script>
