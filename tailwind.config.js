/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ---- MHMS brand palette: Warm Terracotta direction (PRD Section 6) ----
        // Neutral base: cream / sand -> espresso ink. Confident terracotta accent.
        cream: '#FBF7F2', // page background
        sand: '#F2E9DE', // soft section background
        espresso: '#2B211B', // primary ink
        clay: {
          50: '#FCF1EC',
          100: '#F8E0D5',
          200: '#EFC0AC',
          300: '#E29C7E',
          400: '#D27A55',
          500: '#C2613F', // primary terracotta accent
          600: '#A84E30',
          700: '#883D26',
          800: '#6A3020',
          900: '#54281B',
        },
        sage: '#5E6B57', // supporting muted green (secondary accent, sparing)
      },
      fontFamily: {
        // Distinctive heading font + clean body font (PRD Section 6).
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(43, 33, 27, 0.18)',
        lift: '0 24px 60px -20px rgba(43, 33, 27, 0.28)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
}
