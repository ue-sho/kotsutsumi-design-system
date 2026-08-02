import styles from './Card.module.css';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

export type CardVariant = 'outlined' | 'subtle' | 'filled';
export type CardPadding = 'sm' | 'md' | 'lg';
export type CardRadius = 'sm' | 'md' | 'lg';
export type CardTone = 'primary' | 'secondary' | 'muted';

export type CardProps<T extends ElementType = 'div'> = {
  /** Surface treatment for hierarchy and separation. */
  variant?: CardVariant;
  /** Internal spacing, constrained to the design-system scale. */
  padding?: CardPadding;
  /** Corner radius, constrained to the design-system scale. */
  radius?: CardRadius;
  /** Text emphasis within the surface. */
  tone?: CardTone;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

const variantClass: Record<CardVariant, string> = {
  outlined: styles.outlined,
  subtle: styles.subtle,
  filled: styles.filled,
};

const paddingClass: Record<CardPadding, string> = {
  sm: styles.paddingSm,
  md: styles.paddingMd,
  lg: styles.paddingLg,
};

const radiusClass: Record<CardRadius, string> = {
  sm: styles.radiusSm,
  md: styles.radiusMd,
  lg: styles.radiusLg,
};

const toneClass: Record<CardTone, string> = {
  primary: styles.tonePrimary,
  secondary: styles.toneSecondary,
  muted: styles.toneMuted,
};

export function Card<T extends ElementType = 'div'>({
  variant = 'outlined',
  padding = 'md',
  radius = 'md',
  tone = 'primary',
  as,
  className,
  ...props
}: CardProps<T>) {
  const Component = as ?? 'div';
  const classes = [
    styles.card,
    variantClass[variant],
    paddingClass[padding],
    radiusClass[radius],
    toneClass[tone],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component {...props} className={classes} />;
}
