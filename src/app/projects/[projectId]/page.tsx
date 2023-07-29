export default function Page({ params }: { params: { projectId: string } }) {
  return (
    <main className="flex h-full">
      <h1>{params.projectId}</h1>
    </main>
  );
}
