'use client';

import { ComponentProps, FunctionComponent } from 'react';

import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ComponentProps<'button'> {
  loading?: boolean;
}

export const Button: FunctionComponent<ButtonProps> = ({ children, loading = false, className, ...rest }) => {
  return (
    <button
      className={twMerge(
        'flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary p-3 transition-all disabled:opacity-60',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
