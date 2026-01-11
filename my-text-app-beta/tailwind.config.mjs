// const config = {
//   content: [
//     "./app/**/*.{js,jsx,ts,tsx}",
//     "./pages/**/*.{js,jsx,ts,tsx}",
//     "./components/**/*.{js,jsx,ts,tsx}",
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

// export default config;

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./dashboard/**/*.{js,ts,jsx,tsx}",
    "./DummyPage/**/*.{js,ts,jsx,tsx}",
    "./login/**/*.{js,ts,jsx,tsx}",
    "./register/**/*.{js,ts,jsx,tsx}",
    "./app/page.js.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};