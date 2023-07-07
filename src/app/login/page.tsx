import SignInButton from '@/app/components/auth/sign-in-button';

const SignInPage = () => {
  return (
    <main className="flex h-[100dvh] w-screen flex-col items-center justify-center space-x-8 space-y-5">
      <div className="flex w-full max-w-sm flex-col items-center justify-center space-y-3">
        <h1 className="text-3xl">Login to your account</h1>
        <div className="flex w-full flex-col space-y-3 rounded-lg border border-solid border-gray-600 p-5">
          <SignInButton
            iconSrc="icons/discord.svg"
            providerName="Discord"
            provider="discord"
            className="bg-[#5a66ea]"
          />
          <SignInButton
            iconSrc="icons/github.svg"
            providerName="Github"
            provider="github"
            className="border border-gray-600 bg-black"
          />
          <SignInButton
            iconSrc="icons/auth0.svg"
            providerName="Auth0"
            provider="auth0"
            className="bg-white text-black"
          />
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
