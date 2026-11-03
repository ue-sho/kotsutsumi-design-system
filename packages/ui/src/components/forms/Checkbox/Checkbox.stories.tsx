import { expect, userEvent, within } from 'storybook/test';
import { Checkbox } from './Checkbox';
import type { Meta, StoryObj } from '@storybook/react-vite';
const meta = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  args: {
    label: '確認済みにする',
    hint: '支払内容を照合したら選択してください。',
    name: 'confirmed',
  },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const field = c.getByRole('checkbox');
    await userEvent.click(c.getByText('確認済みにする'));
    await expect(field).toBeChecked();
    await userEvent.keyboard(' ');
    await expect(field).not.toBeChecked();
  },
};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = {
  args: { indeterminate: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('checkbox')).toHaveProperty(
      'indeterminate',
      true,
    );
  },
};
export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('checkbox')).toBeDisabled();
  },
};
export const Error: Story = {
  args: { required: true, error: '内容を確認して選択してください。' },
};
