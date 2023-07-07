import SignInButton from '@/app/components/auth/sign-in-button';

const SignInPage = () => {
  return (
    <main className="flex h-[100dvh] w-screen flex-col items-center justify-center space-x-8 space-y-5">
      <div className="flex w-full max-w-sm flex-col items-center justify-center space-y-3">
        <h1 className="text-4xl">Login to your account</h1>
        <div className="flex w-full flex-col space-y-3 rounded-lg bg-gray-900 p-5">
          <SignInButton name="Discord" provider="discord" className="bg-purple-700" />
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
