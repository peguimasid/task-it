import { userCanAccessProject } from '@/lib/project-guard';

export default async function Page({ params }: { params: { projectId: string } }) {
  await userCanAccessProject(params.projectId);

  return (
    <main className="flex h-full">
      <h1>{params.projectId}</h1>
    </main>
  );
}
