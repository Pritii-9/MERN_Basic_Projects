import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss({
      config: './tailwind.config.js',
    }),
    autoprefixer(),
  ],

  
});
