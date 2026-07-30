import StyleDictionary from 'style-dictionary';
import './scripts/customFormatter.js';

/**
 * Style Dictionary drops `description` from CSS output unless it is copied to
 * `comment`, so mirror it across the whole tree before any platform runs.
 */
function mirrorDescription(obj) {
  if (typeof obj !== 'object' || obj === null) return;
  if (Object.hasOwn(obj, 'value') && obj.description) {
    obj.comment = obj.description;
  }
  for (const value of Object.values(obj)) {
    if (typeof value === 'object') mirrorDescription(value);
  }
}

function copyDescriptionToComment(tokens) {
  mirrorDescription(tokens);

  return tokens;
}

StyleDictionary.registerPreprocessor({
  name: 'descriptionToComment',
  preprocessor: copyDescriptionToComment,
});

const transforms = [
  'attribute/cti',
  'name/kebab',
  'time/seconds',
  'html/icon',
  'color/css',
  'asset/url',
  'fontFamily/css',
  'cubicBezier/css',
  'strokeStyle/css/shorthand',
  'border/css/shorthand',
  'typography/css/shorthand',
  'transition/css/shorthand',
  'shadow/css/shorthand',
];

export default {
  source: ['tokens/**/*.json'],
  preprocessors: ['descriptionToComment'],
  log: { verbosity: 'default' },
  platforms: {
    css: {
      transforms,
      prefix: 'kt',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
        },
      ],
      options: {
        // Keep semantic tokens as var() references to primitives. Inlining the
        // resolved values would make a theme override impossible to express by
        // redefining a single primitive.
        outputReferences: true,
      },
    },
    ts: {
      transforms,
      prefix: 'kt',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.ts',
          format: 'typescript-formatter',
        },
      ],
    },
  },
};
