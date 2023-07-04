import { FunctionComponent } from 'react';
import Image from 'next/image';

const Home: FunctionComponent = () => {
  return (
    <main className="relative flex h-[100dvh] w-screen flex-col">
      <h1>Task-it</h1>
      <Image className="w-96" width={100} height={100} src="favicon.svg" alt="fdfd" />
    </main>
  );
};

export default Home;
