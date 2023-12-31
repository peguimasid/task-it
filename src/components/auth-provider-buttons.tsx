'use client';

import { useCallback, useMemo, useState } from 'react';
import { OAuthProviderType } from 'next-auth/providers';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export const AuthProviderButtons = () => {
  const [isLoading, setIsLoading] = useState({
    google: false,
    github: false,
    discord: false,
    auth0: false,
    '42-school': false
  });

  const disabled = useMemo(() => {
    return Object.values(isLoading).some((val) => val === true);
  }, [isLoading]);

  const login = useCallback(async (selectedProvider: OAuthProviderType) => {
    setIsLoading((providers) => ({ ...providers, [selectedProvider]: true }));
    await signIn(selectedProvider);
  }, []);

  return (
    <div className="flex w-full flex-col space-y-3 rounded-lg border border-solid border-muted p-5">
      <Button disabled={disabled} className="gap-2" variant="secondary" onClick={() => login('google')}>
        {isLoading.google ? <Icons.spinner className="h-5 w-5 animate-spin" /> : <Icons.google className="h-5 w-5" />}
        <p>Google</p>
      </Button>
      <Button disabled={disabled} className="gap-2" variant="secondary" onClick={() => login('github')}>
        {isLoading.github ? <Icons.spinner className="h-5 w-5 animate-spin" /> : <Icons.github className="h-5 w-5" />}
        <p>Github</p>
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="flex w-full flex-row justify-center space-x-3">
        <Button disabled={disabled} className="gap-2" variant="secondary" size="icon" onClick={() => login('discord')}>
          {isLoading.discord ? (
            <Icons.spinner className="h-5 w-5 animate-spin" />
          ) : (
            <Icons.discord className="h-5 w-5" />
          )}
        </Button>
        <Button
          disabled={disabled}
          className="gap-2"
          variant="secondary"
          size="icon"
          onClick={() => login('42-school')}
        >
          {isLoading['42-school'] ? (
            <Icons.spinner className="h-5 w-5 animate-spin" />
          ) : (
            <Icons.school42 className="h-5 w-5" />
          )}
        </Button>
        <Button disabled={disabled} className="gap-2" variant="secondary" size="icon" onClick={() => login('auth0')}>
          {isLoading.auth0 ? <Icons.spinner className="h-5 w-5 animate-spin" /> : <Icons.auth0 className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
};
