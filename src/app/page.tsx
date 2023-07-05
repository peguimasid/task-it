import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getServerSession } from 'next-auth';

import { Ubuntu } from 'next/font/google';

import { twMerge } from 'tailwind-merge';

const ubuntu = Ubuntu({
  weight: '500'
});

const Home = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect('api/auth/signin');
  }

  return (
    <main className="relative flex h-[100dvh] w-screen flex-col items-center justify-center space-x-8">
      <div className="flex flex-row items-center justify-center space-x-8">
        <Image className="w-40" width={100} height={100} src="favicon.svg" alt="Task-it logo" />
        <h1 className={twMerge('text-8xl', ubuntu.className)}>Task-it</h1>
      </div>
      <Link href="/api/auth/signout" className="rounded-lg bg-blue-500 px-4 py-2">
        Logout
      </Link>
    </main>
  );
};

export default Home;
