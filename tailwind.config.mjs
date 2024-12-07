/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      CoFoNormal: ["CoFo Sans Normal", "sans-serif"],
      CoFoBold: ["CoFo-Sans-Bold", "sans-serif"],
      CoFoMedium: ["CoFo Sans Medium", "sans-serif"],
      CoFoBlack: ["CoFo Sans Black", "sans-serif"],
    },
  },
  plugins: [],
};
