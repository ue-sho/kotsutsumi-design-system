import { forwardRef, useId } from 'react';
import styles from './Select.module.css';
import type { SelectHTMLAttributes, ReactNode } from 'react';

export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'children' | 'multiple' | 'size'
> {
  /** 操作対象を説明する可視ラベル。 */
  label: string;
  hint?: ReactNode;
  /** 入力の訂正方法を含むエラー。aria-invalid と説明に反映する。 */
  error?: string;
  children?: ReactNode;
}
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      label,
      hint,
      error,
      id,
      required,
      className,
      'aria-describedby': describedBy,
      'aria-invalid': invalid,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const description =
      [
        describedBy,
        hint ? `${fieldId}-hint` : undefined,
        error ? `${fieldId}-error` : undefined,
      ]
        .filter(Boolean)
        .join(' ') || undefined;
    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={fieldId}>
          {label}
          {required && <span className={styles.required}>必須</span>}
        </label>
        <select
          {...props}
          ref={ref}
          id={fieldId}
          required={required}
          aria-invalid={error ? true : invalid}
          aria-describedby={description}
          className={[styles.control, className].filter(Boolean).join(' ')}
        />
        {hint && (
          <p id={`${fieldId}-hint`} className={styles.hint}>
            {hint}
          </p>
        )}
        {error && (
          <p id={`${fieldId}-error`} className={styles.error}>
            {error}
          </p>
        )}
      </div>
    );
  },
);
