import { expect, within } from 'storybook/test';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('First block')).toBeVisible();
    await expect(canvas.getByText('Second block')).toBeVisible();
    await expect(canvas.getByText('Third block')).toBeVisible();
  },
};
