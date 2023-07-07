import Image from 'next/image';

import { Ubuntu } from 'next/font/google';

import { twMerge } from 'tailwind-merge';

import { SignOutButton } from '@/app/components/auth/sign-out-button';
import { getServerSession } from 'next-auth';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: '500'
});

const Home = async () => {
  const session = await getServerSession();

  return (
    <main className="relative flex h-[100dvh] w-screen flex-col items-center justify-center space-x-8 space-y-5">
      <div className="flex flex-row items-center justify-center space-x-8">
        <Image className="w-40" width={100} height={100} src="favicon.svg" alt="Task-it logo" />
        <h1 className={twMerge('text-8xl', ubuntu.className)}>Task-it</h1>
      </div>
      <div className="flex flex-col items-center justify-center space-y-3">
        {session?.user?.image && (
          <Image
            src={session?.user?.image}
            alt="User profile image"
            width={90}
            height={90}
            className="w-24 rounded-full"
          />
        )}
        <h1>Username: {session?.user?.name}</h1>
        <h1>Email: {session?.user?.email}</h1>
      </div>
      <SignOutButton />
    </main>
  );
};

export default Home;
