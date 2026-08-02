import styles from './Prose.module.css';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

export type ProseSize = 'sm' | 'md' | 'lg';
export type ProseMaxWidth = 'narrow' | 'normal' | 'wide' | 'full';

export type ProseProps<T extends ElementType = 'article'> = {
  size?: ProseSize;
  maxWidth?: ProseMaxWidth;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

const sizeClass: Record<ProseSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

const maxWidthClass: Record<ProseMaxWidth, string> = {
  narrow: styles.maxWidthNarrow,
  normal: styles.maxWidthNormal,
  wide: styles.maxWidthWide,
  full: styles.maxWidthFull,
};

export function Prose<T extends ElementType = 'article'>({
  size = 'md',
  maxWidth = 'normal',
  as,
  className,
  ...props
}: ProseProps<T>) {
  const Component = as ?? 'article';
  const classes = [
    styles.prose,
    sizeClass[size],
    maxWidthClass[maxWidth],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component {...props} className={classes} />;
}
