import styles from './Stack.module.css';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

export type StackGap =
  | 'none'
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl';
export type StackAlign = 'stretch' | 'start' | 'center' | 'end';

export type StackProps<T extends ElementType = 'div'> = {
  gap?: StackGap;
  align?: StackAlign;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

const gapClass: Record<StackGap, string> = {
  none: styles.gapNone,
  '3xs': styles.gap3xs,
  '2xs': styles.gap2xs,
  xs: styles.gapXs,
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
  xl: styles.gapXl,
  '2xl': styles.gap2xl,
  '3xl': styles.gap3xl,
};

const alignClass: Record<StackAlign, string> = {
  stretch: styles.alignStretch,
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
};

export function Stack<T extends ElementType = 'div'>({
  gap = 'md',
  align = 'stretch',
  as,
  className,
  ...props
}: StackProps<T>) {
  const Component = as ?? 'div';
  const classes = [styles.stack, gapClass[gap], alignClass[align], className]
    .filter(Boolean)
    .join(' ');

  return <Component {...props} className={classes} />;
}
