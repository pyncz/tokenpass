<template>
  <lib-radio
    v-model="localeModel"
    :options="localeOptions"
    direction="x"
    thin
  >
    <template #option="{ option, checked }">
      <a role="button" class="tw-radio-option-thin tw-text-xs" :class="{ checked }">{{ option.label }}</a>
    </template>
  </lib-radio>
</template>

<script setup lang="ts">
import type { SelectOption } from '../../models'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localeOptions = computed<SelectOption[]>(() => locales.value.map(l => ({
  value: typeof l === 'string' ? l : l.code,
  label: typeof l === 'string' ? l : (l.name ?? l.code).toUpperCase(),
})))

const localeModel = ref(locale)

watch(localeModel, (newLocale) => {
  const router = useRouter()
  router.push(switchLocalePath(newLocale))
})
</script>
