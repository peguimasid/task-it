'use client';

import { ButtonHTMLAttributes, FunctionComponent, PropsWithChildren } from 'react';

import { CircularProgress } from '@mui/material';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
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
      {loading && <CircularProgress color="inherit" size={20} className="mr-2" />}
      {children}
    </button>
  );
};
