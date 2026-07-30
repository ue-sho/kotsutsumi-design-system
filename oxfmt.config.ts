import { defineConfig } from 'oxfmt';

export default defineConfig({
  printWidth: 80,
  singleQuote: true,
  sortPackageJson: false,
  sortImports: {
    newlinesBetween: false,
    ignoreCase: false,
    customGroups: [
      {
        groupName: 'react',
        selector: 'external',
        elementNamePattern: ['react', 'react-dom', 'react-dom/**'],
        modifiers: ['value'],
      },
    ],
    groups: [
      'react',
      'builtin',
      'external',
      'parent',
      'sibling',
      'index',
      'type',
    ],
  },
  ignorePatterns: [
    '**/.git',
    '**/node_modules',
    '**/.turbo',
    '**/dist',
    '**/build',
    '**/storybook-static',
    '**/coverage',
    '**/docs',
    '**/.claude',
    '.commitlintrc.yml',
    'pnpm-workspace.yaml',
    '**/pnpm-lock.yaml',
  ],
});
