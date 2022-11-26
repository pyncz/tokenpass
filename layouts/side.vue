<template>
  <div class="tw-article">
    <div class="tw-pt-20 md:tw-pt-28 tw-space-y-12">
      <div class="tw-flex">
        <logo-main-link />
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
  </div>

  <teleport to="body">
    <div class="side-bg" />
  </teleport>
</template>

<style lang="scss">
.content {
  h1, h2, h3, h4, h5, h6 {
    @apply tw-mt-[1.25em];
  }
  p {
    @apply tw-mb-[0.75em] tw-text-dim-1 tw-leading-md;
  }
  ul, ol {
    @apply tw-mt-[1.25em] tw-mb-[1.5em] tw-text-dim-1;
  }
  ol {
    @apply tw-list-decimal tw-list-inside;
  }
  li {
    @apply tw-mb-[0.75em];
  }
}
</style>

<style lang="scss">
  .side-bg {
    @apply tw-fixed tw-inset-0 tw-z-muted;
    @apply before:tw-absolute before:tw-inset-0 before:tw-rotate-[-15deg];
    &::before {
      background:
        radial-gradient(90% 9rem at 50% 3rem, rgba(144, 0, 255, 1), transparent),
        radial-gradient(24rem 14rem at 20% 10rem, rgba(82, 236, 243, 0.4), transparent);
      @apply tw-scale-[2] tw--translate-y-1/2 tw-origin-top-right;
      background-size: 200%;
      background-position: -10rem;
      mask-image: radial-gradient(90% 4rem at 20% 11rem, rgba(0,0,0,var(--o-side-page-bg)) 50%, transparent);
    }
  }
</style>
