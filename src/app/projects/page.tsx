import { Metadata } from 'next';
import { SignOutButton } from '../../components/auth/sign-out-button';
import { prisma } from '@/server/prisma';
import { getServerAuthSession } from '@/server/auth';

export const metadata: Metadata = {
  title: 'Task-it | Projects'
};

const Page = async () => {
  const session = await getServerAuthSession();

  if (!session?.user) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { projects: true }
  });

  console.log(user?.projects);

  return (
    <main className="flex h-[100dvh] w-screen flex-col items-center justify-center space-x-8 space-y-5">
      <div className="flex flex-col items-center justify-center space-y-3">
        <h1>List user projects</h1>
        <SignOutButton />
      </div>
    </main>
  );
};

export default Page;
