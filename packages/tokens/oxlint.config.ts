import { defineConfig } from 'oxlint';
import baseConfig from '../../oxlint.config.ts';

export default defineConfig({
  extends: [baseConfig],
  rules: {
    // The Style Dictionary config imports ./scripts/customFormatter.js purely
    // for its registerFormat side effect, which is the documented pattern.
    'import/no-unassigned-import': 'off',
  },
});
