import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['typescript', 'react', 'react-perf', 'jsx-a11y', 'import'],
  categories: {
    correctness: 'error',
    suspicious: 'error',
    pedantic: 'off',
  },
  rules: {
    'no-console': 'warn',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'typescript/consistent-type-imports': 'error',
    'typescript/no-explicit-any': 'error',
    'typescript/no-non-null-assertion': 'error',
    'typescript/no-misused-promises': 'error',
    'typescript/switch-exhaustiveness-check': 'error',
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
