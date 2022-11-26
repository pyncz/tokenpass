<template>
  <span class="[&>*]:tw-inline [&>*]:tw-leading-inherit" v-html="content" />
</template>

<script setup lang="ts">
import { micromark } from 'micromark'

const props = defineProps<{
  value: string
}>()

const content = computed(() => micromark(props.value))
</script>
