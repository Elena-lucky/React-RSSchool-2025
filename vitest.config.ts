import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [tsconfigPaths()],
    test: {
      environment: 'jsdom',
      include: ['**/*.test.tsx'],
      exclude: ['**/node_modules/**', 'src/App.tsx'],
      globals: true,
      restoreMocks: true,
      setupFiles: '/src/tests/setup.ts',
    },
  })
);
