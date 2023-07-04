import { FunctionComponent } from 'react';
import Image from 'next/image';
import { Ubuntu } from 'next/font/google';

import { twMerge } from 'tailwind-merge';

const ubuntu = Ubuntu({
  weight: '500'
});

const Home: FunctionComponent = () => {
  return (
    <main className="relative flex h-[100dvh] w-screen flex-row items-center justify-center space-x-8">
      <Image className="w-40" width={100} height={100} src="favicon.svg" alt="Task-it logo" />
      <h1 className={twMerge('text-8xl', ubuntu.className)}>Task-it</h1>
    </main>
  );
};

export default Home;
