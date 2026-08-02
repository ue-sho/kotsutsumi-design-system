import { expect, within } from 'storybook/test';
import { Button } from '../../Button';
import { EmptyState } from './EmptyState';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Feedback/EmptyState',
  component: EmptyState,
  args: {
    title: 'まだ日記がありません',
    description: '最初の日記を書いてみましょう。',
    tone: 'secondary',
  },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'muted'],
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithAction: Story = {
  args: {
    action: <Button>新規作成</Button>,
    'aria-label': '日記の空状態',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByRole('region');

    await expect(root.tagName).toBe('SECTION');
    await expect(canvas.getByRole('heading', { level: 2 })).toHaveTextContent(
      'まだ日記がありません',
    );
    await expect(
      canvas.getByText('最初の日記を書いてみましょう。'),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: '新規作成' }),
    ).toBeVisible();
  },
};

export const WithoutAction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByRole('button')).not.toBeInTheDocument();
  },
};

export const MutedTone: Story = {
  args: {
    title: '表示できる記録がありません',
    description: '条件を変えてもう一度お試しください。',
    tone: 'muted',
  },
};

export const PolymorphicElement: Story = {
  args: {
    as: 'article',
    'aria-label': '日記の空状態',
  },
  play: async ({ canvasElement }) => {
    const root = within(canvasElement).getByRole('article');

    await expect(root).toHaveAttribute('aria-label', '日記の空状態');
  },
};
