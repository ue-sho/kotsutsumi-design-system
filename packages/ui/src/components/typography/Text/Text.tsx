import styles from './Text.module.css';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

export type TextSize = 'sm' | 'md' | 'lg';
export type TextWeight = 'regular' | 'medium' | 'bold';
export type TextTone = 'primary' | 'secondary' | 'muted';

export type TextProps<T extends ElementType = 'p'> = {
  size?: TextSize;
  weight?: TextWeight;
  tone?: TextTone;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

const sizeClass: Record<TextSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

const weightClass: Record<TextWeight, string> = {
  regular: styles.weightRegular,
  medium: styles.weightMedium,
  bold: styles.weightBold,
};

const toneClass: Record<TextTone, string> = {
  primary: styles.tonePrimary,
  secondary: styles.toneSecondary,
  muted: styles.toneMuted,
};

export function Text<T extends ElementType = 'p'>({
  size = 'md',
  weight = 'regular',
  tone = 'primary',
  as,
  className,
  ...props
}: TextProps<T>) {
  const Component = as ?? 'p';
  const classes = [
    styles.text,
    sizeClass[size],
    weightClass[weight],
    toneClass[tone],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component {...props} className={classes} />;
}
