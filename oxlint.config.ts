import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['typescript', 'react', 'react-perf', 'jsx-a11y', 'import'],
  categories: {
    correctness: 'error',
    suspicious: 'warn',
    pedantic: 'off',
  },
  rules: {
    'no-console': 'warn',
    'typescript/consistent-type-imports': 'error',
    'react/jsx-key': 'error',
  },
  ignorePatterns: [
    'dist',
    'build',
    'storybook-static',
    '.turbo',
    'node_modules',
  ],
});
