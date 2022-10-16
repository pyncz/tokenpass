<template>
  <div class="tw-field field" :class="props.class">
    <vee-field
      v-slot="scope"
      v-bind="$attrs"
      :label="props.visibleName ?? props.label"
      :name="props.name"
    >
      <div class="tw-flex">
        <label v-if="props.label" :for="id" class="field-meta tw-label">
          {{ props.label }}
        </label>
      </div>
      <slot
        v-bind="{
          ...scope,
          field: { ...scope.field, id },
        }"
      />
    </vee-field>
    <vee-error-message v-slot="{ message }" :name="props.name">
      <p class="field-meta tw-form-error">
        {{ message }}
      </p>
    </vee-error-message>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuid4 } from 'uuid'
import { ErrorMessage as VeeErrorMessage, Field as VeeField } from 'vee-validate'

const props = defineProps<{
  name: string
  label?: string
  visibleName?: string
  class?: any
}>()

const id = uuid4()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style scoped lang="scss">
  .field {
    input {
      @apply tw-w-full;
    }
  }
</style>
