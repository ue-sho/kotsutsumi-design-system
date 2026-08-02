import styles from './Link.module.css';
import type { AnchorHTMLAttributes } from 'react';

export type LinkUnderline = 'always' | 'hover' | 'none';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
  underline?: LinkUnderline;
  muted?: boolean;
  showExternalIcon?: boolean;
}

const underlineClass: Record<LinkUnderline, string> = {
  always: styles.underlineAlways,
  hover: styles.underlineHover,
  none: styles.underlineNone,
};

const EXTERNAL_URL_PATTERN = /^https?:\/\//i;

function mergeRel(rel: string | undefined) {
  const relSet = new Set((rel ?? '').split(' ').filter(Boolean));
  relSet.add('noopener');
  relSet.add('noreferrer');
  return [...relSet].join(' ');
}

export function Link({
  href,
  external,
  underline = 'hover',
  muted = false,
  showExternalIcon = true,
  className,
  target,
  rel,
  children,
  ...props
}: LinkProps) {
  const isExternal = external ?? EXTERNAL_URL_PATTERN.test(href);
  const resolvedTarget = isExternal ? (target ?? '_blank') : target;
  const resolvedRel = isExternal ? mergeRel(rel) : rel;
  const classes = [
    styles.link,
    underlineClass[underline],
    muted ? styles.muted : undefined,
    isExternal ? styles.external : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      {...props}
      href={href}
      className={classes}
      target={resolvedTarget}
      rel={resolvedRel}
    >
      <span>{children}</span>
      {isExternal && showExternalIcon ? (
        <svg
          className={styles.externalIcon}
          aria-hidden="true"
          viewBox="0 0 16 16"
          width="12"
          height="12"
        >
          <path
            d="M6.25 3.25h6.5v6.5h-1.5V5.81L4.53 12.53l-1.06-1.06 6.72-6.72H6.25z"
            fill="currentColor"
          />
        </svg>
      ) : null}
    </a>
  );
}
