const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '320px',
      // => @media (min-width: 640px) { ... }
      'md': '640px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        sfProReg: ['var(--font-sfProReg)'],
        sfProMd: ['var(--font-sfProMd)'],
        sfProSb: ['var(--font-sfProSb)'],
        sfProBold: ['var(--font-sfProBold)'],
      },
      colors: {
        white: "#FFFFFF",
        black: "#18181B",
      },
    },
  },
  plugins: [nextui(
      {
        themes: {
          light: {
            colors: {
              background: "#FFFFFF", // or DEFAULT
              foreground: "#11181C", // or 50 to 900 DEFAULT
              primary: {
                //... 50 to 900
                foreground: "#FFFFFF",
                DEFAULT: "#18181B",
              },
              // ... rest of the colors
            },
          },
        },
      }
  )],
}

