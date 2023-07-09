import { Metadata } from 'next';

import SignInButton from '@/components/auth/sign-in-button';
import { FunctionComponent } from 'react';
import { TopBar } from '../../components/top-bar';

export const metadata: Metadata = {
  title: 'Task-it | SignIn'
};

const Page: FunctionComponent = () => {
  return (
    <main className="flex h-[100dvh] w-screen flex-col">
      <TopBar />
      <section className="flex h-full items-center justify-center space-x-8 space-y-5">
        <div className="flex w-full max-w-sm flex-col items-center justify-center space-y-3">
          <h1 className="text-3xl">Sign in to continue</h1>
          <div className="flex w-full flex-col space-y-3 rounded-lg border border-solid border-gray-600 p-5">
            <SignInButton
              iconSrc="icons/google.svg"
              providerName="Google"
              provider="google"
              className="bg-white text-black"
            />
            <SignInButton
              iconSrc="icons/github.svg"
              providerName="Github"
              provider="github"
              className="border border-gray-600 bg-black"
            />
            <SignInButton
              iconSrc="icons/discord.svg"
              providerName="Discord"
              provider="discord"
              className="bg-[#5a66ea]"
            />
            <SignInButton
              iconSrc="icons/facebook.svg"
              providerName="Facebook"
              provider="facebook"
              className="bg-[#0668E1]"
            />
            <SignInButton
              iconSrc="icons/42-school.svg"
              providerName="42"
              provider="42-school"
              className="border border-gray-600 bg-black"
            />
            <SignInButton
              iconSrc="icons/auth0.svg"
              providerName="Auth0"
              provider="auth0"
              className="bg-[#eb5424] text-white"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
