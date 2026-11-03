// oxlint-disable jsx-a11y/no-noninteractive-tabindex -- Scrollable table region must support keyboard scrolling.
import { forwardRef } from 'react';
import styles from './Table.module.css';
import type {
  TableHTMLAttributes,
  HTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';
export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** 表の対象・期間・単位が分かるタイトル。 */ caption: string;
}
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { caption, children, className, ...props },
  ref,
) {
  return (
    <section
      className={styles.scroll}
      tabIndex={0}
      aria-label={`${caption}（横スクロール可能）`}
    >
      <table
        {...props}
        ref={ref}
        className={[styles.table, className].filter(Boolean).join(' ')}
      >
        <caption className={styles.caption}>{caption}</caption>
        {children}
      </table>
    </section>
  );
});
export function TableHead(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} />;
}
export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}
export function TableRow(props: HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...props} />;
}
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  numeric?: boolean;
}
export function TableCell({
  numeric = false,
  className,
  ...props
}: TableCellProps) {
  return (
    <td
      {...props}
      className={
        [numeric ? styles.numeric : undefined, className]
          .filter(Boolean)
          .join(' ') || undefined
      }
    />
  );
}
export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  numeric?: boolean;
}
export function TableHeaderCell({
  numeric = false,
  scope = 'col',
  className,
  ...props
}: TableHeaderCellProps) {
  return (
    <th
      {...props}
      scope={scope}
      className={
        [numeric ? styles.numeric : undefined, className]
          .filter(Boolean)
          .join(' ') || undefined
      }
    />
  );
}
