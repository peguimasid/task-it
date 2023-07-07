'use client';

import { FunctionComponent, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

import { signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

import { twMerge } from 'tailwind-merge';

interface SignInButtonProps {
  iconSrc: string;
  providerName: string;
  provider: BuiltInProviderType;
  className?: string;
}

const SignInButton: FunctionComponent<SignInButtonProps> = ({ iconSrc, providerName, provider, className }) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const handleSignIn = useCallback(() => {
    signIn(provider, { callbackUrl });
  }, [callbackUrl, provider]);

  return (
    <button
      className={twMerge(
        'flex w-full items-center justify-center space-x-2 rounded-md py-3 transition-all hover:bg-opacity-80',
        className
      )}
      onClick={handleSignIn}
    >
      <Image width={90} height={90} src={iconSrc} alt={iconSrc} className="h-auto w-6" />
      <p className="text-md">Continue with {providerName}</p>
    </button>
  );
};

export default SignInButton;
