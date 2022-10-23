<template>
  <lib-radio
    v-model="colorMode.preference"
    :options="themeOptions"
    :label="t('colorMode')"
  />
</template>

<script setup lang="ts">
import type { SelectOption } from '../../models'

const colorMode = useColorMode()

const { t } = useI18n()
const getThemeLabel = (theme: string) => t(`theme.${theme}`)

const themeOptions: SelectOption[] = themes.map(theme => ({
  value: theme,
  label: getThemeLabel(theme),
  description: theme === 'system' ? getThemeLabel(colorMode.value) : '',
}))
</script>
