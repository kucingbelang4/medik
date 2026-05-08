/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'medik-blue': '#004ac6',
        'care-teal': '#006a61',
        'hospital-white': '#faf8ff',
        'clinical-gray': '#f3f3fe',
        'clinical-slate': '#191b23',
        // Surface colors from DESIGN.md
        surface: '#faf8ff',
        'surface-dim': '#d9d9e5',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f3f3fe',
        'surface-container': '#ededf9',
        'surface-container-high': '#e7e7f3',
        'surface-container-highest': '#e1e2ed',
        // Primary (Medik Blue)
        primary: '#004ac6',
        'on-primary': '#ffffff',
        'primary-container': '#2563eb',
        'on-primary-container': '#eeefff',
        // Secondary (Care Teal)
        secondary: '#006a61',
        'on-secondary': '#ffffff',
        'secondary-container': '#86f2e4',
        'on-secondary-container': '#006f66',
        // Tertiary
        tertiary: '#943700',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#bc4800',
        'on-tertiary-container': '#ffede6',
        // Error
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',
        // Text
        'on-surface': '#191b23',
        'on-surface-variant': '#434655',
        'inverse-surface': '#2e3039',
        'inverse-on-surface': '#f0f0fb',
        // Outlines
        outline: '#737686',
        'outline-variant': '#c3c6d7',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'h1': ['40px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h2': ['32px', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '-0.01em' }],
        'h3': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label-bold': ['14px', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '0.02em' }],
        'label-sm': ['12px', { lineHeight: '1.2', fontWeight: '500', letterSpacing: '0.04em' }],
      },
      spacing: {
        // 4px base grid
        '1': '4px',  // xs
        '2': '8px',  // sm
        '4': '16px', // md
        '6': '24px', // lg
        '10': '40px', // xl
        gutter: '24px',
        margin: '32px',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        full: '9999px',
      },
      boxShadow: {
        'level-0': 'none',
        'level-1': '0px 4px 20px rgba(30, 41, 59, 0.05)',
        'level-2': '0px 8px 30px rgba(30, 41, 59, 0.08)',
        'level-3': '0px 12px 40px rgba(30, 41, 59, 0.12)',
      },
    },
  },
  plugins: [],
}