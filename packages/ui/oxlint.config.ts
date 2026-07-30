import { defineConfig } from 'oxlint';
import baseConfig from '../../oxlint.config.ts';

export default defineConfig({
  extends: [baseConfig],
  overrides: [
    {
      files: ['.storybook/**'],
      rules: {
        // The preview imports token and canvas CSS for their side effects,
        // which is the only way to load a stylesheet.
        'import/no-unassigned-import': 'off',
      },
    },
  ],
});
