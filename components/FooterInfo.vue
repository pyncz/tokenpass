<template>
  <footer class="footer">
    <nav class="tw-flex tw-gap-1.5">
      <nuxt-link class="tw-link-muted" :to="localeRoute({ name: 'index' })">
        {{ $t('home') }}
      </nuxt-link>
      <nuxt-link class="tw-link-muted" :to="localeRoute({ name: 'about' })">
        {{ $t('about.title') }}
      </nuxt-link>
    </nav>
    <p class="tw-text-xs">
      {{ years }}.

      {{ $t('madeBy') }}
      <a-link class="tw-link-muted author-link" blank href="https://github.com/pyncz"><icon name="github" />
        pyncz</a-link>
    </p>
  </footer>
</template>

<script setup lang="ts">
const localeRoute = useLocaleRoute()
const years = useYearsFrom(2022)
</script>

<style scoped lang="scss">
.footer {
  @apply tw-text-sm tw-text-dim-3 tw-space-y-1.5;
  @apply tw-border-t tw-border-solid tw-border-separator-muted tw-pt-8;
  @screen md {
    @apply tw-border-none tw-pt-0;
  }
}
.author-link {
  @apply tw-border-b tw-border-solid tw-pb-0.5 tw-border-separator-muted hover:tw-border-separator;
}
</style>
