import { Metadata } from 'next';

import { TopBar } from '@/components/top-bar';
import SignInButton from '@/app/(auth)/signin/_components/sign-in-button';

export const metadata: Metadata = {
  title: 'Task-it | SignIn'
};

export default async function Page() {
  return (
    <main className="flex h-[100dvh] w-screen flex-col">
      <TopBar />
      <section className="flex h-full items-center justify-center space-x-8 space-y-5 px-5">
        <div className="flex w-full max-w-sm flex-col items-center justify-center space-y-3">
          <h1 className="text-2xl">Sign in to continue</h1>
          <div className="flex w-full flex-col space-y-3 rounded-lg border border-solid border-muted p-5">
            <SignInButton iconSrc="icons/google.svg" providerName="Google" provider="google" />
            <SignInButton iconSrc="icons/github.svg" providerName="Github" provider="github" />
            <SignInButton iconSrc="icons/discord.svg" providerName="Discord" provider="discord" />
            <SignInButton iconSrc="icons/facebook.svg" providerName="Facebook" provider="facebook" />
            <SignInButton iconSrc="icons/42-school.svg" providerName="42" provider="42-school" />
            <SignInButton iconSrc="icons/auth0.svg" providerName="Auth0" provider="auth0" />
          </div>
        </div>
      </section>
    </main>
  );
}
