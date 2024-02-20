/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sfProReg: ['var(--font-sfProReg)'],
        sfProMd: ['var(--font-sfProMd)'],
        sfProSb: ['var(--font-sfProSb)'],
        sfProBold: ['var(--font-sfProBold)'],
      },
    },
  },
  plugins: [],
}

