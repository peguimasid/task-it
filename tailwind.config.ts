import { Config } from 'tailwindcss';

export default {
  important: true,
  corePlugins: {
    preflight: false
  },
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#207ce9'
        },
        secondary: {
          DEFAULT: '#00aef7'
        }
      }
    }
  },
  plugins: []
} satisfies Config;
