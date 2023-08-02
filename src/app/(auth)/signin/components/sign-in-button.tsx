'use client';

import { FunctionComponent, useCallback } from 'react';
import Image from 'next/image';

import { signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

import { twMerge } from 'tailwind-merge';
import { Button, ButtonProps } from '@/components/ui/button';

interface SignInButtonProps extends ButtonProps {
  iconSrc: string;
  providerName: string;
  provider: BuiltInProviderType;
  className?: string;
}

const SignInButton: FunctionComponent<SignInButtonProps> = ({
  iconSrc,
  providerName,
  provider,
  className,
  ...rest
}) => {
  const handleSignIn = useCallback(() => {
    signIn(provider);
  }, [provider]);

  return (
    <Button className={twMerge('gap-3', className)} variant="outline" onClick={handleSignIn} {...rest}>
      <Image width={90} height={90} src={iconSrc} alt={iconSrc} className="h-auto w-6" />
      <p className="text-md">Continue with {providerName}</p>
    </Button>
  );
};

export default SignInButton;
