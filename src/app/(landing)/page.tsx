import Image from 'next/image';

import { Ubuntu } from 'next/font/google';

import { twMerge } from 'tailwind-merge';

import Link from 'next/link';

import { TopBar } from '@/components/top-bar';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
});

const SignInButton = () => {
  return (
    <Link className="rounded-lg border-2 border-secondary px-8 py-2 text-sm" href="/signin">
      Login
    </Link>
  );
};

export default function Page() {
  return (
    <main className="flex h-[100dvh] w-screen flex-col">
      <TopBar userActions={SignInButton} />
      <section className="flex h-full flex-col items-center justify-center space-y-12">
        <div className="flex flex-col items-center justify-center space-y-3 px-5">
          <div className="flex items-center justify-center space-x-4">
            <h1 className={twMerge('text-3xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl', ubuntu.className)}>
              Welcome to Task-it
            </h1>
            <Image
              className="pointer-events-none w-8 select-none sm:w-10 md:w-14 lg:w-20"
              width={100}
              height={100}
              src="favicon.svg"
              alt="Task-it logo"
            />
          </div>
          <p className="text-center text-gray-500 md:text-lg lg:text-xl">Keep project management simple as should be</p>
        </div>
        <Link className="group relative" href="/signin">
          <div className="absolute inset-0 rounded-lg blur-md transition-all duration-300 group-hover:bg-primary" />
          <div className="relative flex flex-row items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-5 py-3 font-semibold sm:px-8 sm:py-4">
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
}
