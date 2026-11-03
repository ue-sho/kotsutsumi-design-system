import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
} from 'react';
import styles from './Checkbox.module.css';
import type { InputHTMLAttributes, ReactNode } from 'react';
export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'children'
> {
  label: string;
  hint?: ReactNode;
  error?: string;
  /** 一部選択を表示。checked とは別にネイティブDOMへ反映する。 */
  indeterminate?: boolean;
}
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      hint,
      error,
      indeterminate = false,
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
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    useEffect(() => {
      if (inputRef.current) inputRef.current.indeterminate = indeterminate;
    }, [indeterminate]);
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
        <label htmlFor={fieldId} className={styles.label}>
          <input
            {...props}
            ref={inputRef}
            id={fieldId}
            type="checkbox"
            required={required}
            aria-invalid={error ? true : invalid}
            aria-describedby={description}
            className={[styles.control, className].filter(Boolean).join(' ')}
          />
          <span>
            {label}
            {required && <span className={styles.required}>必須</span>}
          </span>
        </label>
        {hint && (
          <p className={styles.hint} id={`${fieldId}-hint`}>
            {hint}
          </p>
        )}
        {error && (
          <p className={styles.error} id={`${fieldId}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  },
);
