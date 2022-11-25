module.exports = ({ addUtilities, matchUtilities, theme }) => {
  const size = value => ({
    height: value,
    minHeight: value,
    width: value,
    minWidth: value,
  })
  matchUtilities(
    {
      size,
      circle: value => ({
        ...size(value),
        borderRadius: theme('borderRadius.full'),
      }),
    },
    { values: theme('height') },
  )
  addUtilities({
    '.bg-beacon': {
      background: `
            radial-gradient(100% 80% at 0% 80%, #435bff 15%, #5134ff 30%, #6e30ff 46%, transparent 50%),
            radial-gradient(180% 180% at 100% 80%, #13dcff 5%, #2bee44 11%, #ff7b1b 36%, #7c21ff 50%)
          `,
    },
    '.bg-wc': {
      background: `
            radial-gradient(10rem 10rem at 90% -5rem, #ce2c9e 30%, #6823ff, rgb(52 218 207), #ff0090, transparent),
            radial-gradient(20rem 13rem at 14% 120%, #ff005e 2%, #800ab1, rgb(37 0 141) 24%, #ff7e29 39%)
          `,
    },
    '.bg-placeholder': {
      backgroundImage: 'radial-gradient(100% 100% at 90% 70%, rgb(var(--c-accent-primary)), transparent), radial-gradient(60% 60% at 20% 30%, rgb(var(--c-accent-secondary)), transparent), linear-gradient(rgb(var(--c-bg-dim-2)), rgb(var(--c-bg-dim-2)))',
    },
    '.transition-nobg-fast': {
      transition: `all ${theme('transitionDuration.fast')}, background 0s`,
    },
    '.transition-nobg-normal': {
      transition: `all ${theme('transitionDuration.normal')}, background 0s`,
    },
    '.bordered': {
      'position': 'relative',
      '&::before': {
        content: '" "',
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        border: `1px solid ${theme('borderColor.text.dim.2')}`,
      },
    },
    '.duration-onhover-fast': {
      'transitionDuration': theme('transitionDuration.normal'),
      '&:hover': {
        transitionDuration: theme('transitionDuration.fast'),
      },
    },
    '.width-dialog': {
      width: '25rem',
    },
    '.modal-container': {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  })
}
