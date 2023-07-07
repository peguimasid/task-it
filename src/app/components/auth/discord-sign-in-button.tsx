'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

const DiscordSignInButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  return (
    <button
      className="flex w-full items-center justify-center bg-purple-700"
      onClick={() => signIn('discord', { callbackUrl })}
    >
      Continue with Discord
    </button>
  );
};

export default DiscordSignInButton;
