import styles from './Container.module.css';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ContainerPadding = 'sm' | 'md' | 'lg' | 'xl';

export type ContainerProps<T extends ElementType = 'div'> = {
  /** 横幅の上限。記事・一覧などの読み幅を統一する。 */
  size?: ContainerSize;
  /** 左右の余白。画面端の詰まりを防ぐ。 */
  px?: ContainerPadding;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

const sizeClass: Record<ContainerSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
  full: styles.sizeFull,
};

const paddingClass: Record<ContainerPadding, string> = {
  sm: styles.pxSm,
  md: styles.pxMd,
  lg: styles.pxLg,
  xl: styles.pxXl,
};

export function Container<T extends ElementType = 'div'>({
  size = 'lg',
  px = 'md',
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? 'div';
  const classes = [
    styles.container,
    sizeClass[size],
    paddingClass[px],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component {...props} className={classes} />;
}
