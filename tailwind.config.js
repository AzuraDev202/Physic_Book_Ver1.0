/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Safelist patterns: the seed HTML strings live outside scanned folders
  // so Tailwind's scanner may purge utilities used only inside DB content.
  // We add regex patterns to ensure the color utilities used for the
  // formula cards are always included in the generated CSS.
  safelist: [
    { pattern: /^(from|to)-(purple|amber|sky|emerald)-(50|100|300|400|600|700|800|900)$/ },
    { pattern: /^bg-(amber|purple|sky|emerald)-(50|100|300|400|600|700|800|900)/ },
    { pattern: /^dark:bg-(amber|purple|sky|emerald)-(50|100|300|400|600|700|800|900)/ },
    { pattern: /^border-(amber|purple|sky|emerald)-(300|400|600|700)$/ },
    { pattern: /^ring(-\d)?(-amber|-purple|-sky|-emerald)?/ },
    { pattern: /^text-(amber|purple|sky|emerald)-(50|900)/ }
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          500: '#06b6d4',
          600: '#0891b2',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
