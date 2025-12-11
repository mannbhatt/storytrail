/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "4rem",
      },
    },
    extend: {
      colors: {
        primary: "#0EA5E9",       // Sky Blue
        primaryDark: "#0284C7",   // Blue
        background: "#F0F9FF",    // Light Sky
        textDark: "#0F172A",      // Navy
        accent: "#FACC15",        // Yellow Sand
      },
      fontFamily: {
        heading: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      borderRadius: {
        xl: "1rem",
      },
      boxShadow: {
        smSoft: "0 6px 18px rgba(15,23,42,0.06)",
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
    },
  },
  plugins: [],
};
