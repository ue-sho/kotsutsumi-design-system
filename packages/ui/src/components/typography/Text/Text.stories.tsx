import { expect, within } from 'storybook/test';
import { Text } from './Text';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Typography/Text',
  component: Text,
  args: {
    children: '日々の記録を、静かに積み重ねる。',
    size: 'md',
    weight: 'regular',
    tone: 'primary',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    weight: {
      control: 'inline-radio',
      options: ['regular', 'medium', 'bold'],
    },
    tone: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'muted'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const text = canvas.getByText('日々の記録を、静かに積み重ねる。');
    await expect(text).toBeVisible();
    await expect(text.tagName).toBe('P');
  },
};

export const PolymorphicElement: Story = {
  args: {
    as: 'span',
    children: '補足テキスト',
    tone: 'muted',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const text = canvas.getByText('補足テキスト');
    await expect(text.tagName).toBe('SPAN');
  },
};

export const Matrix: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {(['primary', 'secondary', 'muted'] as const).map((tone) =>
        (['sm', 'md', 'lg'] as const).map((size) => (
          <Text key={`${tone}-${size}`} {...args} tone={tone} size={size}>
            {tone} / {size}
          </Text>
        )),
      )}
    </div>
  ),
};
