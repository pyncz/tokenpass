<template>
  <lib-radio
    v-model="colorMode.preference"
    :options="themeOptions"
    direction="x"
    thin
  >
    <template #option="{ option, checked }">
      <a
        v-if="option.value === 'system'"
        role="button"
        class="tw-radio-option-thin"
        :class="{ checked }"
      >
        <icon name="desktop" />
      </a>
      <a
        v-else-if="option.value === 'light'"
        role="button"
        class="tw-radio-option-thin"
        :class="{ checked }"
      >
        <icon name="sun" class="tw-scale-[1.2]" />
      </a>
      <a
        v-else-if="option.value === 'dark'"
        role="button"
        class="tw-radio-option-thin"
        :class="{ checked }"
      >
        <icon name="moon" />
      </a>
    </template>
  </lib-radio>
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
