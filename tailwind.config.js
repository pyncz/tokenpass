const plugin = require('tailwindcss/plugin')
const addHeaders = require('./tailwind/headers')

function c(color, opacityValue) {
  return opacityValue === undefined
    ? `rgb(var(${color}))`
    : `rgba(var(${color}), ${opacityValue})`
}

// return color with concomitant opacity
function co(color) {
  return ({ opacityValue }) => c(color, opacityValue)
}

// fill values for enumerable props
function fill(
  size,
  valueFormer,
  start = 1,
  keyFormer = i => i,
) {
  const config = {}
  for (let i = start; i <= start + size - 1; i++) {
    config[keyFormer(i)] = valueFormer(i)
  }
  return config
}

const sansSerif = [
  'ui-sans-serif',
  'system-ui',
  '-apple-system',
  'sans-serif',
]

const textColors = {
  base: co('--c-color-base'),
  dim: fill(3, i => co(`--c-color-dim-${i}`)),
}

// Read more about tailwindcss configuration: https://tailwindcss.com/docs/configuration
module.exports = {
  mode: 'jit',
  content: ['**/*.{vue,js}'],
  prefix: 'tw-',
  safelist: [
    'light-mode',
    'dark-mode',
    { pattern: /^tw-h-logo-.+$/ },
  ],
  theme: {
    // structure
    fontSize: {
      '2xs': ['0.675rem', { lineHeight: '0.675rem', letterSpacing: '.05em' }],
      'xs': '0.75rem',
      'sm': '0.875rem',
      'normal': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      'unset': 'unset',
      'inherit': 'inherit',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        md: '2rem',
        lg: '2.5rem',
      },
    },
    gridTemplateColumns: {
      side: '3fr minmax(16rem, 1fr)',
      cards: 'repeat(auto-fill, minmax(14rem, 1fr))',
    },
    colors: {
      black: co('--c-black'),
      white: co('--c-white'),
      accent: {
        primary: co('--c-accent-primary'),
        secondary: co('--c-accent-secondary'),
      },
    },
    fontFamily: {
      header: ['Mulish', ...sansSerif],
      sans: ['Roboto', ...sansSerif],
    },
    lineHeight: {
      none: 1,
      xs: 1.1,
      sm: 1.15,
    },
    // skins
    textColor: theme => ({
      ...theme('colors'),
      ...textColors,
      button: {
        primary: co('--c-button-primary-color'),
        secondary: co('--c-button-secondary-color'),
      },
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      text: textColors,
      base: co('--c-bg-base'),
      card: co('--c-bg-card'),
      dim: fill(2, i => co(`--c-bg-dim-${i}`)),
      button: {
        primary: co('--c-button-primary-bg'),
        secondary: co('--c-button-secondary-bg'),
      },
    }),
    borderColor: theme => ({
      ...theme('colors'),
      text: textColors,
      separator: {
        DEFAULT: co('--c-separator'),
        muted: co('--c-separator-muted'),
        vivid: co('--c-separator-vivid'),
      },
    }),
    borderRadius: {
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px',
    },
    scale: {
      0: '0',
      50: '0.5',
      click: '0.975',
      normal: '1',
    },
    fill: theme => ({
      ...theme('backgroundColor'),
    }),
    stroke: theme => ({
      ...theme('borderColor'),
    }),
    opacity: {
      0: '0',
      10: '0.1',
      20: '0.2',
      muted: '0.5',
      soft: '0.8',
      full: '1',
    },
    backgroundOpacity: theme => ({
      ...theme('opacity'),
      modal: 'var(--o-modal-overlay)',
    }),
    dropShadow: {
      title: 'var(--s-title)',
    },
    transitionDuration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    zIndex: {
      muted: '-1',
      1: '1',
      modal: '100',
    },
    extend: {
      screens: {
        '2xs': '320px',
        'xs': '400px',
      },
      height: {
        'logo-xs': '1.25rem',
        'logo-sm': '2rem',
        'logo-md': '2.5rem',
        'logo-lg': '3rem',
        'logo-xl': '3.75rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    plugin(addHeaders),
    ({ addComponents, theme }) => {
      addComponents({
        '.link-primary': {
          'cursor': 'pointer',
          'color': c('--c-link-primary'),
          'fontWeight': theme('fontWeight.medium'),
          'transitionDuration': theme('transitionDuration.normal'),
          '&:hover': {
            color: c('--c-link-primary-vivid'),
            transitionDuration: theme('transitionDuration.fast'),
          },
        },
      })
    },
  ],
}
