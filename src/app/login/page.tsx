import DiscordSignInButton from '@/app/components/auth/discord-sign-in-button';

const SignInPage = () => {
  return (
    <main className="flex h-[100dvh] w-screen flex-col items-center justify-center space-x-8 space-y-5">
      <div className="flex max-w-sm flex-col justify-center space-y-3">
        <h1>Login to you account</h1>
        <DiscordSignInButton />
      </div>
    </main>
  );
};

export default SignInPage;
