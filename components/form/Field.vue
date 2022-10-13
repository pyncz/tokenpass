<template>
  <div class="field">
    <vee-field v-slot="fieldScope" v-bind="$attrs" :name="props.name">
      <slot v-bind="fieldScope" />
    </vee-field>
    <vee-error-message v-slot="{ message }" :name="props.name">
      <p class="tw-form-error">
        {{ message }}
      </p>
    </vee-error-message>
  </div>
</template>

<script setup lang="ts">
import { ErrorMessage as VeeErrorMessage, Field as VeeField } from 'vee-validate'

const props = defineProps<{
  name: string
}>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style lang="scss">
  .field {
    @apply tw-space-y-1.5;
    input {
      @apply tw-w-full;
    }
  }
</style>
