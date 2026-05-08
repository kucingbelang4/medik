'use client';

import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noBorder?: boolean;
}

export function Card({ children, className, noBorder = false }: CardProps) {
  return (
    <div className={clsx('medik-card', { 'medik-card--no-border': noBorder }, className)}>
      {children}
    </div>
  );
}

export default Card;