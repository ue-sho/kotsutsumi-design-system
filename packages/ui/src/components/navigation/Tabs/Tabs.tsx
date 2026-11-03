import { useId, useRef, useState } from 'react';
import styles from './Tabs.module.css';
import type { HTMLAttributes, ReactNode, KeyboardEvent } from 'react';
export interface TabsItem {
  value: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}
export interface TabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'onChange'
> {
  label: string;
  items: readonly TabsItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}
/** 同一画面内の表示切替。別ページの移動には Link を使う。 */
export function Tabs({
  label,
  items,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: TabsProps) {
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const [internal, setInternal] = useState(defaultValue);
  const requested = value ?? internal;
  const active =
    items.find((item) => item.value === requested && !item.disabled) ??
    items.find((item) => !item.disabled);
  function select(next: string) {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  }
  function keyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const enabled = items
      .map((item, i) => (item.disabled ? -1 : i))
      .filter((i) => i >= 0);
    const position = enabled.indexOf(index);
    let next: number | undefined;
    const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
    if (event.key === 'Home') next = enabled[0];
    else if (event.key === 'End') next = enabled.at(-1);
    else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      const direction = (event.key === 'ArrowRight' ? 1 : -1) * (rtl ? -1 : 1);
      next = enabled[(position + direction + enabled.length) % enabled.length];
    }
    if (next !== undefined) {
      event.preventDefault();
      refs.current[next]?.focus();
      const item = items[next];
      if (item) select(item.value);
    }
  }
  const activeIndex = active ? items.indexOf(active) : -1;
  return (
    <div
      {...props}
      className={[styles.tabs, className].filter(Boolean).join(' ')}
    >
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="horizontal"
        className={styles.list}
      >
        {items.map((item, index) => (
          <button
            key={item.value}
            ref={(element) => {
              refs.current[index] = element;
            }}
            id={`${base}-tab-${index}`}
            type="button"
            role="tab"
            aria-controls={`${base}-panel-${index}`}
            aria-selected={active?.value === item.value}
            tabIndex={active?.value === item.value ? 0 : -1}
            disabled={item.disabled}
            className={styles.tab}
            onClick={() => select(item.value)}
            onKeyDown={(event) => keyDown(event, index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <div
          key={item.value}
          id={`${base}-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${index}`}
          hidden={index !== activeIndex}
          tabIndex={0}
          className={styles.panel}
        >
          {index === activeIndex ? item.content : null}
        </div>
      ))}
    </div>
  );
}
