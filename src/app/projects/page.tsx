import { getServerAuthSession } from '@/server/auth';
import { Metadata } from 'next';
import { SignOutButton } from '../components/auth/sign-out-button';

export const metadata: Metadata = {
  title: 'Task-it | Projects'
};

const Projects = async () => {
  const session = await getServerAuthSession();

  return (
    <main className="flex h-[100dvh] w-screen flex-col items-center justify-center space-x-8 space-y-5">
      <h1>List user {session?.user.name} projects</h1>
      <SignOutButton />
    </main>
  );
};

export default Projects;
