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
    // The automatic JSX runtime (React 17+) injects the factory itself, so a
    // React import is not required to be in scope.
    'react/react-in-jsx-scope': 'off',
  },
  ignorePatterns: [
    'dist',
    'build',
    'storybook-static',
    '.turbo',
    'node_modules',
  ],
});
