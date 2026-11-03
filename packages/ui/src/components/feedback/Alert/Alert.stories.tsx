import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Alert } from './Alert';
import type { Meta, StoryObj } from '@storybook/react-vite';
const meta = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  args: {
    title: '契約の更新時期が近づいています',
    tone: 'warning',
    children: '11月15日までに補償内容を確認してください。',
  },
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(
      c.getByRole('region', { name: '契約の更新時期が近づいています' }),
    ).toHaveAttribute('aria-live', 'off');
  },
};
export const Success: Story = {
  args: {
    tone: 'success',
    title: '記録を保存しました',
    children: '10月分の支出を確認できます。',
  },
};
export const Danger: Story = {
  args: {
    tone: 'danger',
    title: '入力内容を確認してください',
    children: '金額には0以上の数値を入力してください。',
  },
};
export const Info: Story = {
  args: {
    tone: 'info',
    title: '集計について',
    children: '電気の使用量は検針日を基準に集計しています。',
  },
};
function DynamicExample() {
  const [saved, setSaved] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setSaved(true)}>
        サンプルを保存
      </button>
      <Alert tone="success" title="保存状況" live="polite">
        {saved ? '保存しました。' : 'まだ保存していません。'}
      </Alert>
    </>
  );
}
export const Dynamic: Story = {
  render: () => <DynamicExample />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: 'サンプルを保存' }));
    await expect(c.getByRole('region', { name: '保存状況' })).toHaveAttribute(
      'aria-live',
      'polite',
    );
    await expect(c.getByText('保存しました。')).toBeVisible();
  },
};
