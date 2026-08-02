import { expect, within } from 'storybook/test';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { Prose } from './Prose';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Typography/Prose',
  component: Prose,
  args: {
    size: 'md',
    maxWidth: 'normal',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    maxWidth: {
      control: 'inline-radio',
      options: ['narrow', 'normal', 'wide', 'full'],
    },
  },
} satisfies Meta<typeof Prose>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <Prose {...args}>
      <h1>今日の日記</h1>
      <p>
        これはサンプルの本文です。段落の読みやすさ、行間、リンク、コード表現を確認できます。
      </p>
      <p>
        サイト内リンクは <a href="/diary">日記一覧</a>
        、外部リンクは <a href="https://example.com">example.com</a>{' '}
        のように表示されます。
      </p>
      <h2>気になったこと</h2>
      <ul>
        <li>朝の散歩が気持ちよかった</li>
        <li>新しいレイアウトの実装を進めた</li>
      </ul>
      <blockquote>小さく作って、毎日少しずつ積み上げる。</blockquote>
      <pre>
        <code>{`pnpm --filter @uesho/kotsutsumi-ui storybook`}</code>
      </pre>
      <hr />
      <p>
        inline code 例: <code>const diary = 'kotsutsumi';</code>
      </p>
    </Prose>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { level: 1, name: '今日の日記' }),
    ).toBeVisible();
    await expect(canvas.getByText('気になったこと')).toBeVisible();
    await expect(canvas.getByText(/inline code 例/)).toBeVisible();
  },
};

export const ComposedPrimitives: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <div>
      <Heading level={2} size="sm" tone="muted">
        単独の見出し
      </Heading>
      <Text size="sm" tone="secondary">
        単独の本文
      </Text>
      <Prose {...args}>
        <Heading level={2} size="sm" tone="muted">
          Prose 内の見出し
        </Heading>
        <Text size="sm" tone="secondary">
          Prose 内の本文
        </Text>
      </Prose>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const typography = (label: string) => {
      const { color, fontSize } = getComputedStyle(canvas.getByText(label));
      return { color, fontSize };
    };

    await expect(typography('Prose 内の見出し')).toEqual(
      typography('単独の見出し'),
    );
    await expect(typography('Prose 内の本文')).toEqual(
      typography('単独の本文'),
    );
  },
};
