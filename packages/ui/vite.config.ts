import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['src/**/*.stories.tsx'],
      // Emit declarations next to the JS instead of nesting them under dist/src.
      tsconfigPath: './tsconfig.build.json',
    }),
  ],

  css: {
    modules: {
      // Include the component name so a hashed class stays legible in devtools.
      generateScopedName: 'kt-[local]-[hash:base64:5]',
    },
  },

  build: {
    target: 'es2022',
    cssCodeSplit: false,
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
      // Vite names the extracted stylesheet after `cssFileName`; without it the
      // bundle lands at dist/style.css and the "./styles.css" export 404s.
      cssFileName: 'styles',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
});
