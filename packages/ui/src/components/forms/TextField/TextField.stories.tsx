import { expect, userEvent, within } from 'storybook/test';
import { TextField } from './TextField';
import type { Meta, StoryObj } from '@storybook/react-vite';
const meta = {
  title: 'Components/Forms/TextField',
  component: TextField,
  parameters: { layout: 'padded' },
  args: {
    label: '支出の内容',
    hint: 'あとから見返せる短い名前で入力してください。',
  },
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const field = c.getByRole('textbox');
    await expect(field).toHaveAccessibleName();
    await expect(field).toHaveAccessibleDescription();
    await userEvent.type(field, '買い出し');
    await expect(field).toHaveValue('買い出し');
  },
};
export const Required: Story = { args: { required: true } };
export const Error: Story = {
  args: { error: '内容を確認してください。' },
  play: async ({ canvasElement }) => {
    const field = within(canvasElement).getByRole('textbox');
    await expect(field).toHaveAttribute('aria-invalid', 'true');
    await expect(field).toHaveAccessibleDescription(/内容を確認してください/);
  },
};
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('textbox')).toBeDisabled();
  },
};
export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: '保存済みの記録' },
};
