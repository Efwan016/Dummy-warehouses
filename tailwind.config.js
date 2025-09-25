/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "monday-blue": "#2563EB",
        "monday-gray": "#9CA3AF",
        "monday-background": "#F3F4F6",
        "monday-lime-green": "#32CD32",
        "monday-lime-green-char": "#228B22",
        "monday-black": "#000000",
        "monday-border": "#E5E7EB",
        "monday-gray-background": "#F9FAFB",
      },
      backgroundImage: {
        "blue-gradient": "linear-gradient(to right, #3B82F6, #2563EB)",
      },
    },
  },
  plugins: [],
};
