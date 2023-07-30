import { Config } from 'tailwindcss';

export default {
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
