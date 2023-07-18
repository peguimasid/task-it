'use client';

import { TopBar } from '@/components/top-bar';
import { UserMenu } from '@/components/projects/user-menu';
import { useState } from 'react';

const Page = () => {
  const [counter, setCounter] = useState(0);

  return (
    <main className="flex h-[100dvh] w-screen flex-col">
      <TopBar userActions={UserMenu} />
      <div className="mx-auto flex h-full w-full max-w-4xl flex-col px-2">
        <h1>Create project page {counter}</h1>
        <button onClick={() => setCounter((prev) => prev + 1)}>+</button>
      </div>
    </main>
  );
};

export default Page;
