const plugin = require('tailwindcss/plugin')
const addHeaders = require('./tailwind/headers')
const addLayouts = require('./tailwind/layouts')

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
      state: {
        error: co('--c-state-error'),
      },
      accent: {
        primary: co('--c-accent-primary'),
        secondary: co('--c-accent-secondary'),
      },
      text: textColors,
    },
    fontFamily: {
      header: ['Mulish', ...sansSerif],
      sans: ['Roboto', ...sansSerif],
      mono: ['monospace'],
    },
    lineHeight: {
      none: 1,
      xs: 1.1,
      sm: 1.15,
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
      dim: fill(2, i => co(`--c-bg-dim-${i}`)),
    }),
    borderColor: theme => ({
      ...theme('colors'),
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
    extend: {
      screens: {
        '2xs': '320px',
        'xs': '400px',
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
      boxShadow: {
        accent: '0 0 1rem -0.5rem rgb(var(--c-accent-primary))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    plugin(addHeaders),
    plugin(addLayouts),
    ({ addUtilities, matchUtilities, theme }) => {
      matchUtilities(
        {
          circle: value => ({
            height: value,
            minHeight: value,
            width: value,
            minWidth: value,
            borderRadius: theme('borderRadius.full'),
          }),
          size: value => ({
            height: value,
            minHeight: value,
            width: value,
            minWidth: value,
          }),
        },
        { values: theme('height') },
      )
      addUtilities({
        '.bg-placeholder': {
          backgroundImage: 'radial-gradient(100% 100% at 90% 70%, rgb(var(--c-accent-primary)), transparent), radial-gradient(60% 60% at 20% 30%, rgb(var(--c-accent-secondary)), transparent), linear-gradient(rgb(var(--c-bg-dim-2)), rgb(var(--c-bg-dim-2)))',
        },
        '.transition-nobg-fast': {
          transition: `all ${theme('transitionDuration.fast')}, background 0s`,
        },
        '.transition-nobg-normal': {
          transition: `all ${theme('transitionDuration.normal')}, background 0s`,
        },
        '.shadow-separator': {
          boxShadow: `0 0 0 1px ${theme('borderColor.separator.DEFAULT')}`,
        },
        '.shadow-separator-muted': {
          boxShadow: `0 0 0 1px ${theme('borderColor.separator.muted')}`,
        },
        '.shadow-separator-vivid': {
          boxShadow: `0 0 0 1px ${theme('borderColor.separator.vivid')}`,
        },
        '.bordered': {
          'position': 'relative',
          '&::before': {
            content: '" "',
            position: 'absolute',
            inset: 0,
            border: `1px solid ${theme('borderColor.text.dim.2')}`,
          },
        },
        '.transition-hover': {
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
    },
  ],
}
