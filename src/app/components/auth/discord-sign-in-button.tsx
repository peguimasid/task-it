'use client';

import { FunctionComponent } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

const DiscordSignInButton: FunctionComponent = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  return (
    <button
      className="flex w-full items-center justify-center rounded-md bg-purple-700 py-2"
      onClick={() => signIn('discord', { callbackUrl })}
    >
      Continue with Discord
    </button>
  );
};

export default DiscordSignInButton;
