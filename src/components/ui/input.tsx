'use client';

import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Additional props can be added here
}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={clsx('medik-input', className)}
      {...props}
    />
  );
}

export default Input;