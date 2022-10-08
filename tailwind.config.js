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
  navlink: co('--c-navlink-color'),
  radio: {
    option: {
      active: co('--c-radio-option-checked-text'),
    },
  },
}

const illustrationColors = {
  base: co('--c-i-base'),
  accent: fill(6, i => co(`--c-i-accent-${i}`)),
}

// Read more about tailwindcss configuration: https://tailwindcss.com/docs/configuration
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['**/*.{vue,js}'],
  prefix: 'tw-',
  safelist: [
    'light-mode',
    'dark-mode',
    'black-mode',
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
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      'base': co('--c-bg-base'),
      'radio': {
        group: co('--c-radio-bg'),
        option: {
          active: co('--c-radio-option-checked-bg'),
        },
      },
      'illustration-el': co('--c-illustration-el'),
      'illustration-bg': co('--c-illustration-bg'),
      'card': co('--c-bg-card'),
      'dim': fill(2, i => co(`--c-bg-dim-${i}`)),
      'text': textColors,
      'navlink': co('--c-navlink'),
    }),
    borderColor: theme => ({
      ...theme('colors'),
      separator: {
        DEFAULT: co('--c-separator'),
        muted: co('--c-separator-muted'),
        vivid: co('--c-separator-vivid'),
      },
      navlink: co('--c-navlink'),
    }),
    borderRadius: {
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      navlink: '0.5rem',
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
      illustration: illustrationColors,
    }),
    stroke: theme => ({
      ...theme('borderColor'),
      illustration: illustrationColors,
    }),
    opacity: {
      0: '0',
      10: '0.1',
      20: '0.2',
      soft: '0.5',
      full: '1',
    },
    backgroundOpacity: theme => ({
      ...theme('opacity'),
      'radio-option-active': 'var(--o-radio-option-checked-bg)',
      'modal': 'var(--o-modal-overlay)',
    }),
    boxShadow: {
      card: 'var(--s-card)',
    },
    dropShadow: {
      title: 'var(--s-title)',
    },
    transitionDuration: {
      fast: '150ms',
      normal: '300ms',
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
        'logo-icon': '1.25em',
        'logo-xs': '1.5rem',
        'logo-sm': '2.25rem',
        'logo-md': '3rem',
        'logo-lg': '3.75rem',
        'logo-xl': '4.5rem',
      },
      minWidth: theme => ({
        radio: theme('space.20'),
      }),
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    plugin(addHeaders),
    plugin(addLayouts),
    ({ addUtilities, addComponents, addBase, theme }) => {
      addBase({
        hr: {
          width: '100%',
          borderColor: theme('borderColor.separator.DEFAULT'),
        },
      })

      addUtilities({
        '.b': {
          borderWidth: theme('borderWidth.DEFAULT'),
          borderStyle: 'solid',
        },
        '.article': {
          maxWidth: '40rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
        '.navlink-bg': {
          background: 'radial-gradient(50% 50% at center, rgb(var(--c-navlink)), transparent)',
        },
        '.transition-nobg-fast': {
          transition: 'all 150ms, background 0s',
        },
        '.transition-nobg-normal': {
          transition: 'all 300ms, background 0s',
        },
        '.section': {
          paddingTop: '6rem',
          paddingBottom: '6rem',
        },
        '.bg-accent': {
          backgroundImage: 'linear-gradient(135deg, #56FF47 8%, #00FFE0 88%)',
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
      })

      const buttonComponent = {
        'cursor': 'pointer',
        'gap': theme('gap.1'),
        'display': 'inline-flex',
        'justifyContent': 'center',
        'alignItems': 'center',
        'padding': `${theme('padding.2')} ${theme('padding.3')}`,
        'fontWeight': theme('fontWeight.medium'),
        'transitionDuration': theme('transitionDuration.normal'),
        'borderRadius': theme('borderRadius.DEFAULT'),
        '&:hover': {
          transitionDuration: theme('transitionDuration.fast'),
        },
        '&:active': {
          transform: `scale(${theme('scale.click')})`,
        },
      }
      addComponents({
        '.form-group': {
          display: 'flex',
          flexWrap: 'wrap',
          gapY: theme('space.2'),
          gapX: theme('space.3'),
        },
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
        '.button': buttonComponent,
        '.button-primary': {
          ...buttonComponent,
          'color': c('--c-button-primary-color'),
          'background': c('--c-button-primary-bg'),
          '&:hover': {
            ...buttonComponent['&:hover'],
            background: c('--c-button-primary-bg-vivid'),
          },
        },
        '.button-secondary': {
          ...buttonComponent,
          'color': c('--c-button-secondary-color'),
          'background': c('--c-button-secondary-bg'),
          '&:hover': {
            ...buttonComponent['&:hover'],
            background: c('--c-button-secondary-bg-vivid'),
          },
        },
      })
    },
  ],
}
