'use client';

import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  source?: 'openFDA' | 'RxNorm' | 'BPOM';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ source, children, className }: BadgeProps) {
  const sourceClass = source ? `source-${source.toLowerCase()}` : '';

  return (
    <span className={clsx('medik-badge', sourceClass, className)}>
      {children}
    </span>
  );
}

export default Badge;