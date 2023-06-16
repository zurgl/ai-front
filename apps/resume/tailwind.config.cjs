const baseConfig = require("../../tailwind.config.cjs");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    ...baseConfig.content,
    "components/**/*.{js,ts,jsx,tsx,mdx}",
    "ui/**/*.{js,ts,jsx,tsx,mdx}",
    "lib/**/*.{js,ts,jsx,tsx,mdx}",
    "icons/**/*.{js,ts,jsx,tsx,mdx}",
    "store/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        // mono: ["var(--font-roboto-mono)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-200": "var(--primary-200)",
        "primary-300": "var(--primary-300)",
        "primary-400": "var(--primary-400)",
        "primary-500": "var(--primary-500)",
        "primary-600": "var(--primary-600)",
        "primary-900": "var(--primary-900)",
        "secondary-300": "var(--secondary-300)",
        "secondary-400": "var(--secondary-400)",
        "secondary-800": "var(--secondary-800)",
      },
    },
  },
  plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./ui/**/*.{js,ts,jsx,tsx,mdx}",
//     "./lib/**/*.{js,ts,jsx,tsx,mdx}",
//     "./icons/**/*.{js,ts,jsx,tsx,mdx}",
//     "./store/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   darkMode: "class",
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ["var(--font-inter)"],
//         mono: ["var(--font-roboto-mono)"],
//       },
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic":
//           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//       },
//       colors: {
//         "primary-200": "var(--primary-200)",
//         "primary-300": "var(--primary-300)",
//         "primary-400": "var(--primary-400)",
//         "primary-500": "var(--primary-500)",
//         "primary-600": "var(--primary-600)",
//         "primary-900": "var(--primary-900)",
//         "secondary-300": "var(--secondary-300)",
//         "secondary-400": "var(--secondary-400)",
//         "secondary-800": "var(--secondary-800)",
//       },
//     },
//   },
//   plugins: [],
// };
