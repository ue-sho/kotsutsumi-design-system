import { expect, within } from 'storybook/test';
import { Badge } from './Badge';
import type { Meta, StoryObj } from '@storybook/react-vite';
const meta = {
  title: 'Components/Feedback/Badge',
  component: Badge,
  args: { children: '確認済み' },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Tones: Story = {
  render: () => (
    <div>
      {(['neutral', 'info', 'success', 'warning', 'danger'] as const).map(
        (tone, index) => (
          <Badge key={tone} tone={tone}>
            {['食費', '更新情報', '確認済み', '要確認', '入力エラー'][index]}
          </Badge>
        ),
      )}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    for (const label of [
      '食費',
      '更新情報',
      '確認済み',
      '要確認',
      '入力エラー',
    ])
      await expect(c.getByText(label)).toBeVisible();
  },
};
export const LongLabel: Story = {
  args: { children: '更新の手続きが必要な契約があります' },
};
