import { Stack } from '../../layout/Stack';
import { Heading } from '../../typography/Heading';
import { Text } from '../../typography/Text';
import styles from './EmptyState.module.css';
import type { HeadingLevel } from '../../typography/Heading';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

export type EmptyStateTone = 'primary' | 'secondary' | 'muted';

export type EmptyStateProps<T extends ElementType = 'section'> = {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  headingLevel?: HeadingLevel;
  tone?: EmptyStateTone;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'title'>;

export function EmptyState<T extends ElementType = 'section'>({
  title,
  description,
  action,
  headingLevel = 2,
  tone = 'secondary',
  as,
  className,
  ...props
}: EmptyStateProps<T>) {
  const Component = (as ?? 'section') as ElementType;
  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <Component {...props} className={classes}>
      <Stack align="center" gap="md">
        <Stack gap="xs" align="center" className={styles.content}>
          <Heading level={headingLevel} size="xl" tone={tone}>
            {title}
          </Heading>
          {description != null ? <Text tone={tone}>{description}</Text> : null}
        </Stack>
        {action != null ? <div className={styles.action}>{action}</div> : null}
      </Stack>
    </Component>
  );
}
