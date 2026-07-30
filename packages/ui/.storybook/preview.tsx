import type { Preview } from '@storybook/react-vite';
// Design tokens must load before any component CSS: every component rule
// resolves its colors and spacing through these custom properties.
import '@kotsutsumi/tokens/tokens.css';
import './preview.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off'   - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
