/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        rubikBurned: ['"Rubik Burned"', 'cursive'],
        rubikVinyl: ['"Rubik Vinyl"', 'cursive'],
        inter: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        custom: '0px 3px 80px rgba(0, 0, 0, 0.5)',
      },
      textDecorationStyle: {
        wavy: 'wavy',
      },
    },
  },
  plugins: [],
};
