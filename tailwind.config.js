/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './src/*.{html,js}', './index.html'],
  safelist: [
    'bg-primary', 'bg-secondary', 'bg-tertiary',
    'text-primary', 'text-secondary', 'text-tertiary',
    'border-primary', 'border-secondary', 'border-tertiary'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#B9FF66",
        secondary: "#191A23",
        tertiary: "#F3F3F3",
      },
      fontFamily: {
        grotesk: ["Space Grotesk", "sans-serif"],
      },
      spacing: {
        '68px': '68px',
        '264px': '264px',
      },
      borderRadius: {
        '2xl': '2rem',
        '3xl': '2.5rem',
      },
      boxShadow: {
        'custom': '0 10px black',
        'accordion': '0 10px black',
      },
    },
  },
  plugins: [
    require('tailwindcss/plugin')(function({ addUtilities, theme }) {
      // Debug: log to confirm plugin runs during tailwind build
      try {
        // eslint-disable-next-line no-console
        console.log('[tailwind-plugin] plugin invoked, theme.colors keys:', Object.keys(theme('colors') || {}));
      } catch (e) {}
      const colors = theme('colors') || {};
      const newUtils = {};
      if (colors.primary) {
        newUtils['.bg-primary'] = { backgroundColor: colors.primary };
        newUtils['.text-primary'] = { color: colors.primary };
        newUtils['.border-primary'] = { borderColor: colors.primary };
      }
      if (colors.secondary) {
        newUtils['.bg-secondary'] = { backgroundColor: colors.secondary };
        newUtils['.text-secondary'] = { color: colors.secondary };
        newUtils['.border-secondary'] = { borderColor: colors.secondary };
      }
      if (colors.tertiary) {
        newUtils['.bg-tertiary'] = { backgroundColor: colors.tertiary };
        newUtils['.text-tertiary'] = { color: colors.tertiary };
        newUtils['.border-tertiary'] = { borderColor: colors.tertiary };
      }
      addUtilities(newUtils, { variants: ['responsive', 'hover'] });
    })
  ],
};
