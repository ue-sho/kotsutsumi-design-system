import { forwardRef } from 'react';
import styles from './Button.module.css';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 見た目の役割。primary は画面内で 1 つに絞る。 */
  variant?: ButtonVariant;
  /** 高さと文字サイズ。 */
  size?: ButtonSize;
  /** 親の幅いっぱいに広げる。 */
  fullWidth?: boolean;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
};

const sizeClass: Record<ButtonSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      // React defaults a <button> inside a <form> to type="submit", which
      // submits the form on any click. Default to "button" so that only an
      // explicit type="submit" does.
      type = 'button',
      className,
      ...props
    },
    ref,
  ) {
    const classes = [
      styles.button,
      variantClass[variant],
      sizeClass[size],
      fullWidth ? styles.fullWidth : undefined,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return <button {...props} ref={ref} type={type} className={classes} />;
  },
);
