import { expect, userEvent, within } from 'storybook/test';
import { RadioGroup } from './RadioGroup';
import type { Meta, StoryObj } from '@storybook/react-vite';
const meta = {
  title: 'Components/Forms/RadioGroup',
  component: RadioGroup,
  args: {
    label: '集計期間',
    name: 'period',
    defaultValue: 'month',
    options: [
      { value: 'month', label: '月ごと' },
      { value: 'year', label: '年ごと' },
      { value: 'custom', label: '期間を指定', disabled: true },
    ],
  },
} satisfies Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const monthly = c.getByRole('radio', { name: '月ごと' });
    await expect(monthly).toBeChecked();
    await userEvent.click(monthly);
    await userEvent.keyboard('{ArrowDown}');
    await expect(c.getByRole('radio', { name: '年ごと' })).toBeChecked();
    await expect(monthly).not.toBeChecked();
    await expect(c.getByRole('radio', { name: '期間を指定' })).toBeDisabled();
  },
};
export const Required: Story = {
  args: { required: true, defaultValue: undefined },
};
export const Disabled: Story = { args: { disabled: true } };
export const Error: Story = {
  args: { error: '集計期間を選んでください。', defaultValue: undefined },
};
export const ExternalForm: Story = {
  args: { required: true, defaultValue: undefined, form: 'settings' },
  render: (args) => (
    <>
      <form id="settings" aria-label="設定" />
      <RadioGroup {...args} />
    </>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const form = c.getByRole<HTMLFormElement>('form', { name: '設定' });
    await expect(form.checkValidity()).toBe(false);
    await expect(new FormData(form).has('period')).toBe(false);

    await userEvent.click(c.getByRole('radio', { name: '月ごと' }));
    await expect(form.checkValidity()).toBe(true);
    await expect(new FormData(form).getAll('period')).toEqual(['month']);

    await userEvent.click(c.getByRole('radio', { name: '年ごと' }));
    await expect(form.checkValidity()).toBe(true);
    await expect(new FormData(form).getAll('period')).toEqual(['year']);

    await userEvent.click(c.getByRole('radio', { name: '期間を指定' }));
    await expect(new FormData(form).getAll('period')).toEqual(['year']);
  },
};
