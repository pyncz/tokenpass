<template>
  <lib-radio
    v-if="themeModes.length > 1"
    v-model="$colorMode.preference"
    :options="themeModes"
    direction="x"
    thin
  >
    <template #option="{ option, checked }">
      <a
        v-if="option === 'system'"
        role="button"
        class="tw-radio-option-thin"
        :class="{ checked }"
        :title="$t('theme.system')"
      >
        <icon name="desktop" />
      </a>
      <a
        v-else-if="option === 'light'"
        role="button"
        class="tw-radio-option-thin"
        :class="{ checked }"
        :title="$t('theme.light')"
      >
        <icon name="sun" class="tw-scale-[1.2]" />
      </a>
      <a
        v-else-if="option === 'dark'"
        role="button"
        class="tw-radio-option-thin"
        :class="{ checked }"
        :title="$t('theme.dark')"
      >
        <icon name="moon" />
      </a>
    </template>
  </lib-radio>
</template>
