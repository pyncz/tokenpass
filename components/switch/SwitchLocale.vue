<template>
  <lib-radio
    v-model="localeModel"
    :options="localeOptions"
    :get-key="(o) => o.value"
    :get-value="(o) => o.value"
    direction="x"
    thin
  >
    <template #option="{ option, checked }">
      <a role="button" class="tw-leading-1 tw-radio-option-thin tw-text-xs" :class="{ checked }">{{ option.label }}</a>
    </template>
  </lib-radio>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localeOptions = computed(() => locales.value.map(l => ({
  value: typeof l === 'string' ? l : l.code,
  label: typeof l === 'string' ? l : (l.name ?? l.code).toUpperCase(),
})))

const localeModel = ref(locale)

watch(localeModel, (newLocale) => {
  const router = useRouter()
  router.push(switchLocalePath(newLocale))
})
</script>
