const plugin = require('tailwindcss/plugin')
const addHeaders = require('./tailwind/headers')
const addLayouts = require('./tailwind/layouts')
const addUtils = require('./tailwind/utils')

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
  prefix: 'tw-',
  safelist: [
    'light-mode',
    'dark-mode',
    { pattern: /^tw-h-logo-.+$/ },
  ],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue',
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
      '3xl': '1.75rem',
      '4xl': '2rem',
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
      state: {
        error: co('--c-state-error'),
        warning: co('--c-state-warning'),
      },
      accent: {
        primary: co('--c-accent-primary'),
        secondary: co('--c-accent-secondary'),
      },
      testnet: co('--c-testnet'),
      custom: co('--color'),
      text: textColors,
    },
    fontFamily: {
      header: ['Mulish', ...sansSerif],
      sans: ['Roboto', ...sansSerif],
      mono: ['monospace'],
    },
    lineHeight: {
      1: 1,
      xs: 1.1,
      sm: 1.15,
      inherit: 'inherit',
    },
    // skins
    textColor: theme => ({
      ...theme('colors'),
      custom: co('--text-color'),
      ...textColors,
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      custom: co('--bg-color'),
      text: textColors,
      overlay: co('--c-overlay-bg'),
      base: co('--c-bg-base'),
      card: co('--c-bg-card'),
      dim: fill(3, i => co(`--c-bg-dim-${i}`)),
    }),
    borderColor: theme => ({
      ...theme('colors'),
      transparent: 'transparent',
      custom: co('--border-color'),
      text: textColors,
      separator: {
        DEFAULT: co('--c-separator'),
        muted: co('--c-separator-muted'),
        vivid: co('--c-separator-vivid'),
      },
    }),
    borderRadius: {
      0: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      lg: '0.5rem',
      xl: '1rem',
      full: '9999px',
    },
    scale: {
      0: '0',
      50: '0.5',
      click: '0.975',
      zoom: '1.1',
      normal: '1',
    },
    fill: theme => ({
      logo: co('--c-logo'),
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
      outline: 'var(--o-outline)',
      custom: 'var(--opacity)',
    },
    textOpacity: theme => ({
      ...theme('opacity'),
      custom: 'var(--text-opacity)',
    }),
    borderOpacity: theme => ({
      ...theme('opacity'),
      custom: 'var(--border-opacity)',
    }),
    backgroundOpacity: theme => ({
      ...theme('opacity'),
      card: 'var(--o-bg-card)',
      custom: 'var(--bg-opacity)',
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
    boxShadow: {
      // emphasize for inputs / controls
      accent: '0 0 1rem -0.5rem rgb(var(--c-accent-primary))',

      // shadows for dialogs, popups etc
      popup: '0 0.75rem 1.75rem -1.75rem rgba(var(--c-color-base), 0.5)',
      modal: '0 0 2rem -1.75rem rgb(var(--c-color-base))',
    },

    extend: {
      screens: {
        '2xs': '320px',
        'xs': '400px',
      },
      blur: {
        px: '1px',
        xs: '2px',
      },
      spacing: {
        'switcher-offset': '0.25rem',
        'form': '1.5rem',
        'form-fields': '1rem',
      },
      height: {
        'switcher-indicator': '1rem',
        'logo-xs': '1.25rem',
        'logo-sm': '2rem',
        'logo-md': '2.5rem',
        'logo-lg': '3rem',
        'logo-xl': '3.75rem',
      },
      minWidth: theme => ({
        radio: theme('space.20'),
      }),
      backdropBlur: {
        xs: '2px',
      },
      fontSize: {
        '1/2': '0.5em',
        '5/8': '0.625em',
        '3/4': '0.75em',
        '7/8': '0.875em',
        '9/8': '1.125em',
        '5/4': '1.25em',
        '3/2': '1.5em',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    plugin(addHeaders),
    plugin(addLayouts),
    plugin(addUtils),
  ],
}
