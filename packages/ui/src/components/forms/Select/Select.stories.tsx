import { expect, userEvent, within } from 'storybook/test';
import { Select } from './Select';
import type { Meta, StoryObj } from '@storybook/react-vite';
const meta = {
  title: 'Components/Forms/Select',
  component: Select,
  parameters: { layout: 'padded' },
  args: {
    label: '分類',
    hint: '支出の用途を選択してください。',
    children: (
      <>
        <option value="">選択してください</option>
        <option value="food">食費</option>
        <option value="utility">光熱費</option>
      </>
    ),
  },
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const field = c.getByRole('combobox');
    await expect(field).toHaveAccessibleName();
    await expect(field).toHaveAccessibleDescription();
    await userEvent.selectOptions(field, 'food');
    await expect(field).toHaveValue('food');
  },
};
export const Required: Story = { args: { required: true } };
export const Error: Story = {
  args: { error: '内容を確認してください。' },
  play: async ({ canvasElement }) => {
    const field = within(canvasElement).getByRole('combobox');
    await expect(field).toHaveAttribute('aria-invalid', 'true');
    await expect(field).toHaveAccessibleDescription(/内容を確認してください/);
  },
};
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('combobox')).toBeDisabled();
  },
};
