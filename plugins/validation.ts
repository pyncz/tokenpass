import { defineRule } from 'vee-validate'
import { integer, length, min_value, required } from '@vee-validate/rules'
import { ethAddress } from '@voire/eth-validation-rules'

defineRule('required', required)
defineRule('min_value', min_value)
defineRule('integer', integer)
defineRule('length', length)

defineRule('eth_address', ethAddress)

export default defineNuxtPlugin(() => {

})
