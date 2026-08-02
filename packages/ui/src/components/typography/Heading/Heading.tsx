import styles from './Heading.module.css';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type HeadingTone = 'primary' | 'secondary' | 'muted';

export type HeadingProps<T extends ElementType = 'h2'> = {
  level?: HeadingLevel;
  size?: HeadingSize;
  balance?: boolean;
  tone?: HeadingTone;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

const defaultSizeByLevel: Record<HeadingLevel, HeadingSize> = {
  1: '3xl',
  2: '2xl',
  3: 'xl',
  4: 'lg',
  5: 'md',
  6: 'sm',
};

const sizeClass: Record<HeadingSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
  '2xl': styles.size2xl,
  '3xl': styles.size3xl,
};

const toneClass: Record<HeadingTone, string> = {
  primary: styles.tonePrimary,
  secondary: styles.toneSecondary,
  muted: styles.toneMuted,
};

export function Heading<T extends ElementType = 'h2'>({
  level = 2,
  size,
  balance = false,
  tone = 'primary',
  as,
  className,
  ...props
}: HeadingProps<T>) {
  const Component = (as ?? `h${level}`) as ElementType;
  const classes = [
    styles.heading,
    sizeClass[size ?? defaultSizeByLevel[level]],
    toneClass[tone],
    balance ? styles.balance : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component {...props} className={classes} />;
}
