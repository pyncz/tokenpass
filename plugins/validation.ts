import { configure, defineRule } from 'vee-validate'
import { integer, length, min_value, required } from '@vee-validate/rules'
import { ethAddress } from '@voire/eth-validation-rules'

defineRule('required', required)
defineRule('min_value', min_value)
defineRule('integer', integer)
defineRule('length', length)

defineRule('eth_address', ethAddress)

configure({
  // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnBlur: true,

  // controls if `change` events should trigger validation with `handleChange` handler
  validateOnChange: true,

  // controls if `input` events should trigger validation with `handleChange` handler
  validateOnInput: true,

  // controls if `update:modelValue` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: true,
})

export default defineNuxtPlugin(() => {

})
