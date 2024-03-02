import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  safelist: ['dark'],

  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

  theme: {
    container: {},
    extend: {
      colors: {},
      borderRadius: {},
      keyframes: {},
      animation: {},
    },
  },
  plugins: [animate],
}
