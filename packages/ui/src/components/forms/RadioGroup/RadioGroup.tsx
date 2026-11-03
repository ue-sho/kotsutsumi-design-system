import { useId } from 'react';
import styles from './RadioGroup.module.css';
import type { FieldsetHTMLAttributes, ReactNode } from 'react';
export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}
export interface RadioGroupProps extends Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'onChange' | 'children'
> {
  label: string;
  /** 同じグループを構成するフォーム名。別のグループとは重複させない。 */
  name: string;
  options: readonly RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
  hint?: ReactNode;
  error?: string;
}
export function RadioGroup({
  label,
  name,
  options,
  value,
  defaultValue,
  onValueChange,
  required,
  hint,
  error,
  id,
  disabled,
  form,
  className,
  'aria-describedby': describedBy,
  ...props
}: RadioGroupProps) {
  const generatedId = useId();
  const groupId = id ?? generatedId;
  const description =
    [
      describedBy,
      hint ? `${groupId}-hint` : undefined,
      error ? `${groupId}-error` : undefined,
    ]
      .filter(Boolean)
      .join(' ') || undefined;
  return (
    <fieldset
      {...props}
      id={groupId}
      disabled={disabled}
      form={form}
      aria-describedby={description}
      aria-invalid={error ? true : props['aria-invalid']}
      className={[styles.group, className].filter(Boolean).join(' ')}
    >
      <legend className={styles.legend}>
        {label}
        {required && <span className={styles.required}>必須</span>}
      </legend>
      {hint && (
        <p className={styles.hint} id={`${groupId}-hint`}>
          {hint}
        </p>
      )}
      {options.map((option) => (
        <label key={option.value} className={styles.option}>
          <input
            className={styles.control}
            type="radio"
            name={name}
            form={form}
            value={option.value}
            checked={value === undefined ? undefined : value === option.value}
            defaultChecked={
              value === undefined ? defaultValue === option.value : undefined
            }
            disabled={option.disabled}
            required={required}
            aria-describedby={description}
            onChange={(event) => onValueChange?.(event.currentTarget.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
      {error && (
        <p className={styles.error} id={`${groupId}-error`}>
          {error}
        </p>
      )}
    </fieldset>
  );
}
