<template>
  <div class="tw-space-y-2">
    <vee-field v-slot="fieldScope" v-bind="$attrs" :name="props.name">
      <slot v-bind="fieldScope" />
    </vee-field>
    <vee-error-message v-slot="{ message }" :name="props.name">
      <p class="tw-text-sm">
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
