'use client';

import { FunctionComponent } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { twMerge } from 'tailwind-merge';
import { BuiltInProviderType } from 'next-auth/providers';

interface SignInButtonProps {
  name: string;
  provider: BuiltInProviderType;
  className?: string;
}

const SignInButton: FunctionComponent<SignInButtonProps> = ({ name, provider, className }) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  return (
    <button
      className={twMerge('flex w-full items-center justify-center rounded-md py-2', className)}
      onClick={() => signIn(provider, { callbackUrl })}
    >
      Continue with {name}
    </button>
  );
};

export default SignInButton;
