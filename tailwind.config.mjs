/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "2px -3px 19px 0 rgba(255, 255, 255, 0)",
      },
    },
  },
  plugins: [],
};
