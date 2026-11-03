import { expect, userEvent, within } from 'storybook/test';
import { Tabs } from './Tabs';
import type { Meta, StoryObj } from '@storybook/react-vite';
const meta = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  args: {
    label: 'エネルギーの種類',
    defaultValue: 'electricity',
    items: [
      { value: 'electricity', label: '電気', content: '電気の使用量 248 kWh' },
      {
        value: 'gas',
        label: 'ガス',
        content: 'ガスの使用量 18 m³',
        disabled: true,
      },
      { value: 'water', label: '水道', content: '水道の使用量 22 m³' },
    ],
  },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('tab', { name: '電気' }));
    await userEvent.keyboard('{ArrowRight}');
    await expect(c.getByRole('tab', { name: '水道' })).toHaveFocus();
    await expect(c.getByRole('tabpanel', { name: '水道' })).toHaveTextContent(
      '22 m³',
    );
    await userEvent.keyboard('{Home}');
    await expect(c.getByRole('tab', { name: '電気' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await userEvent.keyboard('{End}');
    await expect(c.getByRole('tab', { name: '水道' })).toHaveFocus();
  },
};
export const AllDisabled: Story = {
  args: {
    items: [{ value: 'waiting', label: '集計中', content: '', disabled: true }],
  },
};
export const LongLabels: Story = {
  args: {
    items: [
      {
        value: 'current',
        label: '今月のエネルギー使用量',
        content: '今月の記録',
      },
      { value: 'previous', label: '前年同月との比較', content: '比較の記録' },
      {
        value: 'history',
        label: '過去の使用量と契約履歴',
        content: '履歴の記録',
      },
    ],
  },
};
