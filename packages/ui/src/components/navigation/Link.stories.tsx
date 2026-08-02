import { expect, within } from 'storybook/test';
import { Link } from './Link';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Navigation/Link',
  component: Link,
  args: {
    href: '/diary/hello-world',
    children: '記事を読む',
    underline: 'hover',
  },
  argTypes: {
    underline: {
      control: 'inline-radio',
      options: ['always', 'hover', 'none'],
    },
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Internal: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: '記事を読む' });
    await expect(link).toHaveAttribute('href', '/diary/hello-world');
    await expect(link).not.toHaveAttribute('target');
  },
};

export const External: Story = {
  args: {
    href: 'https://example.com',
    children: '外部サイト',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: '外部サイト' });
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  },
};

export const Muted: Story = {
  args: {
    muted: true,
    children: '補助リンク',
  },
};
