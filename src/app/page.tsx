import Image from 'next/image';

import { Ubuntu } from 'next/font/google';

import { twMerge } from 'tailwind-merge';

import { FunctionComponent } from 'react';
import Link from 'next/link';
import { TopBar } from '../components/top-bar';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
});

const Page: FunctionComponent = () => {
  return (
    <main className="flex h-[100dvh] w-screen flex-col">
      <TopBar showLoginButton />
      <section className="flex h-full flex-col items-center justify-center space-y-12">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="flex items-center justify-center space-x-8">
            <h1 className={twMerge('text-7xl font-extrabold', ubuntu.className)}>Welcome to Task-it</h1>
            <Image
              className="pointer-events-none w-20 select-none"
              width={100}
              height={100}
              src="favicon.svg"
              alt="Task-it logo"
            />
          </div>
          <p className="text-xl text-gray-500">Keeping project management simple as should be</p>
        </div>
        <Link className="group relative" href="/login?callbackUrl=/projects">
          <div className="absolute inset-0 rounded-lg blur-md transition-all duration-300 group-hover:bg-primary" />
          <div className="relative flex flex-row items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-4 font-semibold">
            <p>Sign up for free</p>
            <Image
              className="pointer-events-none w-4 select-none"
              width={100}
              height={100}
              src="icons/arrow-right.svg"
              alt="arrow-right-icon"
            />
          </div>
        </Link>
      </section>
    </main>
  );
};

export default Page;
