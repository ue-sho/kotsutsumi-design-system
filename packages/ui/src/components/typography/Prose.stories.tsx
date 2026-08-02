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
};
