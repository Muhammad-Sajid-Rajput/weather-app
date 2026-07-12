/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#131315',
        surface: '#131315',
        'on-background': '#e4e2e4',
        'on-surface': '#FFFFFF',
        'on-surface-variant': '#CBD5E1',
        primary: '#aac7ff',
        'on-primary': '#003064',
        'primary-container': '#3e90ff',
        'on-primary-container': '#002957',
        'primary-fixed': '#d6e3ff',
        secondary: '#fff0c4',
        tertiary: '#58dcb5',
        'tertiary-container': '#00a481',
        outline: '#8b91a0',
        'outline-variant': '#414754',
        'surface-container': '#1f1f21',
        'surface-container-low': '#1b1b1d',
        'surface-container-high': '#2a2a2c',
        'surface-container-highest': '#353437',
        'surface-variant': '#353437',
        error: '#ffb4ab',
      },
      fontFamily: {
        display: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-temp': ['84px', { lineHeight: '90px', letterSpacing: '-0.04em', fontWeight: '600' }],
        'headline-lg': ['32px', { lineHeight: '40px', fontWeight: '500' }],
        'headline-mobile': ['28px', { lineHeight: '34px', fontWeight: '500' }],
        'stat-lg': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'label-mono': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '500' }],
      },
      spacing: {
        'container-padding': '20px',
        'stack-gap': '12px',
        'grid-gutter': '16px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
