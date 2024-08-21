import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@test': path.resolve(__dirname, './test'),
      '@components': path.resolve(__dirname, './src/presentation/components'),
      '@pages': path.resolve(__dirname, './src/presentation/pages'),
      '@hooks': path.resolve(__dirname, './src/presentation/hooks'),
      '@models': path.resolve(__dirname, './src/domain/models'),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['test/vitest.config.tsx'],
  },
});