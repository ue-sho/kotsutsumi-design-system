import { expect, within } from 'storybook/test';
import { Heading } from './Heading';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Typography/Heading',
  component: Heading,
  args: {
    children: '今日の日記',
    level: 2,
    tone: 'primary',
    balance: false,
  },
  argTypes: {
    level: { control: 'inline-radio', options: [1, 2, 3, 4, 5, 6] },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    tone: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'muted'],
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { level: 2, name: '今日の日記' }),
    ).toBeVisible();
  },
};

export const Levels: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {([1, 2, 3, 4, 5, 6] as const).map((level) => (
        <Heading key={level} {...args} level={level}>
          Heading level {level}
        </Heading>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const level of [1, 2, 3, 4, 5, 6] as const) {
      await expect(
        canvas.getByRole('heading', {
          level,
          name: `Heading level ${level}`,
        }),
      ).toBeVisible();
    }
  },
};

export const PolymorphicElement: Story = {
  args: {
    as: 'div',
    children: '見た目だけの見出し',
    balance: true,
    tone: 'muted',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByText('見た目だけの見出し');
    await expect(heading.tagName).toBe('DIV');
  },
};
