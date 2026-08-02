import styles from './Inline.module.css';
import type { StackGap } from '../Stack/index';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

export type InlineGap = StackGap;
export type InlineAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type InlineJustify = 'start' | 'center' | 'end' | 'between';

export type InlineProps<T extends ElementType = 'div'> = {
  gap?: InlineGap;
  align?: InlineAlign;
  justify?: InlineJustify;
  wrap?: boolean;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

const gapClass: Record<InlineGap, string> = {
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

const alignClass: Record<InlineAlign, string> = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
  stretch: styles.alignStretch,
  baseline: styles.alignBaseline,
};

const justifyClass: Record<InlineJustify, string> = {
  start: styles.justifyStart,
  center: styles.justifyCenter,
  end: styles.justifyEnd,
  between: styles.justifyBetween,
};

export function Inline<T extends ElementType = 'div'>({
  gap = 'sm',
  align = 'center',
  justify = 'start',
  wrap = false,
  as,
  className,
  ...props
}: InlineProps<T>) {
  const Component = as ?? 'div';
  const classes = [
    styles.inline,
    gapClass[gap],
    alignClass[align],
    justifyClass[justify],
    wrap && styles.wrap,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component {...props} className={classes} />;
}
