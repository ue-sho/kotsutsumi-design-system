/**
 * Vite runs PostCSS on every stylesheet, including CSS Modules. Autoprefixer
 * targets whatever browserslist resolves to, so vendor prefixes stay in sync
 * with the support policy instead of being hand-written in the source.
 */
export default {
  plugins: {
    autoprefixer: {},
  },
};
