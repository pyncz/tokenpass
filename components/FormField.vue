<template>
  <div class="tw-field field" :class="classes">
    <vee-field
      v-slot="scope"
      v-bind="$attrs"
      :label="visibleName ?? label"
      :name="name"
    >
      <slot name="label" v-bind="{ ...scope, id }">
        <div v-if="label" class="tw-flex">
          <label :for="id" class="field-meta tw-label">
            {{ label }}
          </label>
        </div>
      </slot>
      <slot
        v-bind="{
          ...scope,
          id,
          field: { ...scope.field, id },
        }"
      />
    </vee-field>
    <vee-error-message v-slot="{ message }" :name="name">
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

// move in separated ref not to use `props.class` (since just `class` is a reserved word)
const classes = toRef(props, 'class')

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
