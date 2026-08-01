/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: "#0B4696",
          sky: "#4AC0EE",
          ice: "#F7FBFE",
          surface: "#EEF8FD",
          dark: "#0B1220",
          muted: "#475569",
          border: "#D9EAF4",
          lightBorder: "#EBF4FA"
        }
      },
      fontFamily: {
        heading: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0B4696 0%, #4AC0EE 100%)',
        'soft-glow': 'radial-gradient(circle at 50% 0%, rgba(74, 192, 238, 0.15) 0%, rgba(247, 251, 254, 0) 70%)',
        'blue-glow': 'radial-gradient(circle at 50% 50%, rgba(11, 70, 150, 0.25) 0%, rgba(11, 18, 32, 0) 70%)'
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(11, 70, 150, 0.05), 0 4px 16px -4px rgba(11, 18, 32, 0.03)',
        'soft-md': '0 8px 30px -6px rgba(11, 70, 150, 0.08), 0 4px 12px -2px rgba(11, 18, 32, 0.04)',
        'soft-lg': '0 20px 40px -15px rgba(11, 70, 150, 0.12), 0 10px 20px -5px rgba(11, 18, 32, 0.04)',
        'floating': '0 25px 50px -12px rgba(11, 70, 150, 0.18)',
      },
      borderRadius: {
        'card': '24px',
        'card-lg': '28px',
        'button': '14px',
      }
    },
  },
  plugins: [],
}
