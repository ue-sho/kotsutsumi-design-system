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

export const Internal: Story = {};

export const External: Story = {
  args: {
    href: 'https://example.com',
    children: '外部サイト',
  },
};

export const Muted: Story = {
  args: {
    muted: true,
    children: '補助リンク',
  },
};
