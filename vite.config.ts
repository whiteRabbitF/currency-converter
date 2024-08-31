import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@store': resolve(__dirname, 'src/store'),
      '@services': resolve(__dirname, 'src/services'),
      '@types': resolve(__dirname, 'src/types'),
    },
  },
});

