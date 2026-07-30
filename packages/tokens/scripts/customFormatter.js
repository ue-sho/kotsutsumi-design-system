import StyleDictionary from 'style-dictionary';
import { fileHeader, minifyDictionary } from 'style-dictionary/utils';

/**
 * Emit the token tree as a `as const` TypeScript object so consumers get
 * literal types for every token value, not just `string`.
 */
StyleDictionary.registerFormat({
  name: 'typescript-formatter',
  format: async ({ dictionary, file, options }) => {
    const header = await fileHeader({ file });
    const tokens = JSON.stringify(
      minifyDictionary(dictionary.tokens, options.usesDtcg),
      null,
      2,
    );

    return `${header}export const tokens = ${tokens} as const;\n`;
  },
});
