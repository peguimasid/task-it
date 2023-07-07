import Image from 'next/image';

import { Ubuntu } from 'next/font/google';

import { twMerge } from 'tailwind-merge';

import { SignOutButton } from './components/sign-out-button';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: '500'
});

const Home = async () => {
  return (
    <main className="relative flex h-[100dvh] w-screen flex-col items-center justify-center space-x-8">
      <div className="flex flex-row items-center justify-center space-x-8">
        <Image className="w-40" width={100} height={100} src="favicon.svg" alt="Task-it logo" />
        <h1 className={twMerge('text-8xl', ubuntu.className)}>Task-it</h1>
      </div>
      <SignOutButton />
    </main>
  );
};

export default Home;
