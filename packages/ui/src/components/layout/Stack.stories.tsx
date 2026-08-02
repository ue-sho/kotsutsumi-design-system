import { Stack } from './Stack';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Layout/Stack',
  component: Stack,
  args: {
    gap: 'md',
    align: 'stretch',
  },
  argTypes: {
    gap: {
      control: 'inline-radio',
      options: [
        'none',
        '3xs',
        '2xs',
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
      ],
    },
    align: {
      control: 'inline-radio',
      options: ['stretch', 'start', 'center', 'end'],
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Stack {...args} style={{ maxWidth: '20rem' }}>
      <div
        style={{
          padding: 'var(--kt-spacing-sm)',
          background: 'var(--kt-color-semantic-bg-subtle)',
        }}
      >
        First block
      </div>
      <div
        style={{
          padding: 'var(--kt-spacing-sm)',
          background: 'var(--kt-color-semantic-bg-subtle)',
        }}
      >
        Second block
      </div>
      <div
        style={{
          padding: 'var(--kt-spacing-sm)',
          background: 'var(--kt-color-semantic-bg-subtle)',
        }}
      >
        Third block
      </div>
    </Stack>
  ),
};
