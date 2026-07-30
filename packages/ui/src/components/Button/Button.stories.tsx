import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'ボタン',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  parameters: { layout: 'padded' },
};

/** すべての variant と size の組み合わせを一覧する。 */
export const Matrix: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {(['primary', 'secondary', 'ghost'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', gap: '1rem' }}>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Button key={size} {...args} variant={variant} size={size}>
              {variant} / {size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};
