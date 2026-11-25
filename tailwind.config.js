/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode
        light: {
          background: '#F5F5F7',
          surface: '#FFFFFF',
          primary: '#0A84FF',
          secondary: '#5AC8FA',
          success: '#34C759',
          warning: '#FF9500',
          danger: '#FF3B30',
          text: '#1D1D1F',
          muted: '#86868B',
        },
        // Dark Mode
        dark: {
          background: '#121212',
          surface: '#1C1C1E',
          primary: '#0A84FF',
          secondary: '#5AC8FA',
          success: '#34C759',
          warning: '#FF9500',
          danger: '#FF3B30',
          text: '#FFFFFF',
          muted: '#86868B',
        },
        // Secret Black Mode
        secretBlack: {
          background: '#000000',
          surface: '#141414',
          primary: '#0A84FF',
          secondary: '#5AC8FA',
          success: '#34C759',
          warning: '#FF9500',
          danger: '#FF3B30',
          text: '#FFFFFF',
          muted: '#6E6E73',
        },
      },
    },
  },
  plugins: [],
}
