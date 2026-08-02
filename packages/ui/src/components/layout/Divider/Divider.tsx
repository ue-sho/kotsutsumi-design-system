/* oxlint-disable jsx-a11y/prefer-tag-over-role -- a div supports both horizontal and vertical separators */
import styles from './Divider.module.css';
import type { ComponentPropsWithoutRef } from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerTone = 'primary' | 'secondary' | 'muted';
export type DividerInset = 'none' | 'sm' | 'md' | 'lg';

export type DividerProps = {
  orientation?: DividerOrientation;
  tone?: DividerTone;
  inset?: DividerInset;
} & Omit<ComponentPropsWithoutRef<'div'>, 'role' | 'aria-orientation'>;

const orientationClass: Record<DividerOrientation, string> = {
  horizontal: styles.horizontal,
  vertical: styles.vertical,
};

const toneClass: Record<DividerTone, string> = {
  primary: styles.tonePrimary,
  secondary: styles.toneSecondary,
  muted: styles.toneMuted,
};

const insetClass: Record<DividerInset, string> = {
  none: styles.insetNone,
  sm: styles.insetSm,
  md: styles.insetMd,
  lg: styles.insetLg,
};

export function Divider({
  orientation = 'horizontal',
  tone = 'muted',
  inset = 'none',
  className,
  ...props
}: DividerProps) {
  const classes = [
    styles.divider,
    orientationClass[orientation],
    toneClass[tone],
    insetClass[inset],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      {...props}
      role="separator"
      aria-orientation={orientation}
      className={classes}
    />
  );
}
