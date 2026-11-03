import { forwardRef, useId } from 'react';
import styles from './TextField.module.css';
import type { InputHTMLAttributes, ReactNode } from 'react';

export interface TextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'children' | 'type'
> {
  /** 操作対象を説明する可視ラベル。 */
  label: string;
  hint?: ReactNode;
  /** 入力の訂正方法を含むエラー。aria-invalid と説明に反映する。 */
  error?: string;

  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'search'
    | 'tel'
    | 'url'
    | 'number'
    | 'date'
    | 'month'
    | 'time'
    | 'datetime-local';
}
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      label,
      hint,
      error,
      id,
      required,
      className,
      'aria-describedby': describedBy,
      'aria-invalid': invalid,
      type = 'text',
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
        <input
          {...props}
          type={type}
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
