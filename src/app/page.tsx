import Image from 'next/image';

import { Ubuntu } from 'next/font/google';

import { twMerge } from 'tailwind-merge';

import { SignOutButton } from './components/sign-out-button';
import { getServerSession } from 'next-auth';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: '500'
});

const Home = async () => {
  const session = await getServerSession();

  return (
    <main className="relative flex h-[100dvh] w-screen flex-col items-center justify-center space-x-8">
      <div className="flex flex-row items-center justify-center space-x-8">
        <Image className="w-40" width={100} height={100} src="favicon.svg" alt="Task-it logo" />
        <h1 className={twMerge('text-8xl', ubuntu.className)}>Task-it</h1>
      </div>
      <h1>Username: {session?.user?.name}</h1>
      <h1>Email: {session?.user?.email}</h1>
      <SignOutButton />
    </main>
  );
};

export default Home;
