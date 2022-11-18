<template>
  <div class="tw-field field">
    <slot name="label" v-bind="{ id }">
      <div v-if="label" class="tw-flex">
        <label :for="id" class="field-meta tw-label">
          {{ label }}
        </label>
      </div>
    </slot>
    <slot v-bind="{ id }" />

    <p v-if="error" class="field-meta tw-form-error">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core'
import { v4 as uuid4 } from 'uuid'

const props = defineProps<{
  label?: string
  errors?: ErrorObject[]
}>()

const id = uuid4()
const error = computed(() => unref(props.errors?.[0]?.$message) ?? null)
</script>

<style scoped lang="scss">
  .field {
    input {
      @apply tw-w-full;
    }
  }
</style>
