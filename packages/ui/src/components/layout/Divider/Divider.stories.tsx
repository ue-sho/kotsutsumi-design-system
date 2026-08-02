import { expect, within } from 'storybook/test';
import { Inline } from '../Inline';
import { Divider } from './Divider';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Layout/Divider',
  component: Divider,
  args: {
    orientation: 'horizontal',
    tone: 'muted',
    inset: 'none',
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
    tone: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'muted'],
    },
    inset: {
      control: 'inline-radio',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div>
      <p>Above divider</p>
      <Divider {...args} />
      <p>Below divider</p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const divider = canvas.getByRole('separator');
    await expect(divider).toBeVisible();
    await expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <Inline align="stretch" style={{ minHeight: '4rem' }}>
      <span>Before divider</span>
      <Divider {...args} />
      <span>After divider</span>
    </Inline>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('separator')).toHaveAttribute(
      'aria-orientation',
      'vertical',
    );
  },
};
