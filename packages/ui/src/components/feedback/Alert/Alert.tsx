import { useId } from 'react';
import styles from './Alert.module.css';
import type { HTMLAttributes, ReactNode } from 'react';
export type AlertTone = 'info' | 'success' | 'warning' | 'danger';
export interface AlertProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: string;
  tone?: AlertTone;
  /** 動的に追加した通知にのみ polite / assertive を指定する。既定は off。 */
  live?: 'off' | 'polite' | 'assertive';
  children?: ReactNode;
}
const symbols: Record<AlertTone, string> = {
  info: 'i',
  success: '✓',
  warning: '!',
  danger: '!',
};
export function Alert({
  title,
  tone = 'info',
  live = 'off',
  children,
  id,
  className,
  ...props
}: AlertProps) {
  const generatedId = useId();
  const headingId = `${id ?? generatedId}-title`;
  return (
    <section
      {...props}
      id={id}
      aria-labelledby={headingId}
      aria-live={live}
      aria-atomic={live === 'off' ? undefined : true}
      className={[styles.alert, styles[tone], className]
        .filter(Boolean)
        .join(' ')}
    >
      <span aria-hidden="true" className={styles.symbol}>
        {symbols[tone]}
      </span>
      <div className={styles.body}>
        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>
        {children && <div className={styles.content}>{children}</div>}
      </div>
    </section>
  );
}
