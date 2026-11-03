import { expect, userEvent, within } from 'storybook/test';
import { Textarea } from './Textarea';
import type { Meta, StoryObj } from '@storybook/react-vite';
const meta = {
  title: 'Components/Forms/Textarea',
  component: Textarea,
  parameters: { layout: 'padded' },
  args: {
    label: '設備のメモ',
    hint: '点検内容や気になったことを記録してください。',
  },
} satisfies Meta<typeof Textarea>;
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
