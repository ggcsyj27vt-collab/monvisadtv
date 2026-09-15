/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        indigo: {
          DEFAULT: '#16233F',
          light: '#22335A',
        },
        or: {
          DEFAULT: '#C9A24C',
          light: '#DDBE7A',
          dark: '#A9843A',
        },
        jade: {
          DEFAULT: '#2F6F62',
          light: '#3F8C7C',
          bg: '#E9F2EF',
        },
        papier: '#F7F3EA',
        encre: '#1F2430',
        sable: {
          DEFAULT: '#9C9284',
          light: '#DCD5C4',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      maxWidth: {
        content: '1120px',
      },
    },
  },
  plugins: [],
};
