import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Vacansee/',
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // путь к твоему setup-файлу
    globals: true, // чтобы не импортировать expect в каждом тесте
  },
  plugins: [react()],
});
