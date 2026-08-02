import { expect, within } from 'storybook/test';
import { Inline } from './Inline';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Layout/Inline',
  component: Inline,
  args: {
    gap: 'sm',
    align: 'center',
    justify: 'start',
    wrap: false,
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
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'inline-radio',
      options: ['start', 'center', 'end', 'between'],
    },
    wrap: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Inline>;

export default meta;

type Story = StoryObj<typeof meta>;

const itemStyle = {
  padding: 'var(--kt-spacing-sm)',
  background: 'var(--kt-color-semantic-bg-subtle)',
};

export const Playground: Story = {
  render: (args) => (
    <Inline {...args}>
      <div style={itemStyle}>First item</div>
      <div style={itemStyle}>Second item</div>
      <div style={itemStyle}>Third item</div>
    </Inline>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('First item')).toBeVisible();
    await expect(canvas.getByText('Second item')).toBeVisible();
    await expect(canvas.getByText('Third item')).toBeVisible();
  },
};

export const Wrapping: Story = {
  args: {
    gap: 'sm',
    wrap: true,
  },
  render: (args) => (
    <Inline {...args} style={{ maxWidth: '12rem' }}>
      {['One', 'Two', 'Three', 'Four'].map((label) => (
        <div key={label} style={itemStyle}>
          {label}
        </div>
      ))}
    </Inline>
  ),
};
