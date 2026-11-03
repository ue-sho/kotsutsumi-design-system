import styles from './Badge.module.css';
import type { HTMLAttributes } from 'react';
export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}
/** 状態や分類の短いラベル。色だけで意味を伝えず、必ず文字を入れる。 */
export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={[styles.badge, styles[tone], className]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
