/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ✅ Enables dark mode support
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",    // ✅ Scan Next.js app directory
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // ✅ Scan UI components
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",  // ✅ Scan pages if using Pages Router
    "./src/**/*.{js,ts,jsx,tsx,mdx}",    // ✅ Scan src if using src-based structure
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
