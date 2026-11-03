import { expect, within } from 'storybook/test';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
} from './Table';
import type { Meta, StoryObj } from '@storybook/react-vite';
const meta = {
  title: 'Components/Data/Table',
  component: Table,
  args: { caption: '2026年10月の支出（税込・円）' },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Table>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>内容</TableHeaderCell>
          <TableHeaderCell>分類</TableHeaderCell>
          <TableHeaderCell numeric>金額</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableHeaderCell scope="row">食材の買い出し</TableHeaderCell>
          <TableCell>食費</TableCell>
          <TableCell numeric>6,480</TableCell>
        </TableRow>
        <TableRow>
          <TableHeaderCell scope="row">電気料金</TableHeaderCell>
          <TableCell>光熱費</TableCell>
          <TableCell numeric>8,420</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(
      c.getByRole('table', { name: '2026年10月の支出（税込・円）' }),
    ).toBeVisible();
    await expect(c.getAllByRole('columnheader')).toHaveLength(3);
    await expect(c.getAllByRole('rowheader')).toHaveLength(2);
    await expect(c.getByRole('cell', { name: '6,480' })).toHaveStyle({
      textAlign: 'right',
    });
  },
};
export const Empty: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>内容</TableHeaderCell>
          <TableHeaderCell numeric>金額</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell colSpan={2}>この期間の記録はありません。</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
