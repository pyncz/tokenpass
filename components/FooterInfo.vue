<template>
  <footer class="footer">
    <nav class="tw-flex tw-gap-1.5">
      <nuxt-link class="tw-link-muted !tw-border-0" :to="localeRoute({ name: 'index' })">
        {{ $t('home') }}
      </nuxt-link>
      <nuxt-link class="tw-link-muted !tw-border-0" :to="localeRoute({ name: 'about' })">
        {{ $t('about.title') }}
      </nuxt-link>
    </nav>
    <div class="tw-text-xs">
      {{ years }}.

      {{ $t('madeBy') }}
      <a-link class="tw-pb-0.5" blank href="https://github.com/pyncz"><icon name="github" />
        pyncz</a-link>
    </div>
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
  @screen lg {
    @apply tw-border-none tw-pt-0 tw-fixed tw-bottom-12 tw-backdrop-blur-sm tw-p-3 tw--m-3 tw-rounded;
  }
  @screen xl {
    @apply tw-left-20;
  }
}
</style>
