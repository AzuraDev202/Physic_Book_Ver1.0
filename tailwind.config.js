/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
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
        },
        // Thêm đầy đủ các màu cần cho safelist
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        pink: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
  // Sửa safelist với variants đúng
  safelist: [
    // Gradient colors
    { 
      pattern: /^(from|to)-(purple|amber|sky|emerald)-(50|100|300|400|600|700|800|900)$/,
      variants: ['hover', 'focus']
    },
    // Background colors
    { 
      pattern: /^bg-(amber|purple|sky|emerald)-(50|100|300|400|600|700|800|900)/,
      variants: ['hover', 'focus']
    },
    // Dark mode background colors - THÊM variants
    { 
      pattern: /^dark:bg-(amber|purple|sky|emerald)-(50|100|300|400|600|700|800|900)/,
      variants: ['dark', 'dark:hover', 'dark:focus']
    },
    // Border colors
    { 
      pattern: /^border-(amber|purple|sky|emerald)-(300|400|600|700)$/,
      variants: ['hover', 'focus']
    },
    // Ring colors - SỬA pattern
    { 
      pattern: /^ring(-[0-9]+)?$/,
      variants: ['hover', 'focus']
    },
    { 
      pattern: /^ring-(amber|purple|sky|emerald)(-[0-9]+)?$/,
      variants: ['hover', 'focus']
    },
    // Text colors
    { 
      pattern: /^text-(amber|purple|sky|emerald)-(50|900)$/,
      variants: ['hover', 'focus']
    },

    //AI sidebar
    {
      pattern: /^(from|to|via)-(pink|purple|blue)-(50|100|200|300|400|500|600|700|800|900)$/,
      variants: ['hover', 'focus', 'dark'],
    },
    // Các class cụ thể (an toàn, không lỗi)
  'bg-gradient-to-r',
  'from-purple-600',
  'to-pink-600',
  'from-blue-500',
  'to-blue-600',
  'dark:bg-gray-800',
  'dark:bg-gray-900',
  'dark:text-white',
  'dark:text-gray-300'
  ],
}