import { expect, within } from 'storybook/test';
import { Card } from './Card';
import type { Meta, StoryObj } from '@storybook/react-vite';

const variants = ['outlined', 'subtle', 'filled'] as const;
const paddings = ['sm', 'md', 'lg'] as const;
const radii = ['sm', 'md', 'lg'] as const;

const meta = {
  title: 'Components/Surface/Card',
  component: Card,
  args: {
    variant: 'outlined',
    padding: 'md',
    radius: 'md',
    tone: 'primary',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: variants },
    padding: { control: 'inline-radio', options: paddings },
    radius: { control: 'inline-radio', options: radii },
    tone: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'muted'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <Card {...args}>Card content</Card>,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('Card content')).toBeVisible();
  },
};

export const VariantMatrix: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 'var(--kt-spacing-md)',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      }}
    >
      {variants.map((variant) => (
        <Card
          key={variant}
          as="article"
          variant={variant}
          padding="md"
          radius="md"
        >
          {variant}
        </Card>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const cards = within(canvasElement).getAllByRole('article');
    await expect(cards).toHaveLength(variants.length);
    await expect(cards[0]).toHaveTextContent('outlined');
    await expect(cards[1]).toHaveTextContent('subtle');
    await expect(cards[2]).toHaveTextContent('filled');
  },
};

export const PaddingMatrix: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 'var(--kt-spacing-md)',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      }}
    >
      {paddings.map((padding) => (
        <Card
          key={padding}
          as="article"
          padding={padding}
          radius="md"
          variant="outlined"
        >
          padding {padding}
        </Card>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getAllByRole('article')).toHaveLength(
      paddings.length,
    );
  },
};

export const RadiusMatrix: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 'var(--kt-spacing-md)',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      }}
    >
      {radii.map((radius) => (
        <Card
          key={radius}
          as="article"
          padding="md"
          radius={radius}
          variant="subtle"
        >
          radius {radius}
        </Card>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getAllByRole('article')).toHaveLength(
      radii.length,
    );
  },
};
