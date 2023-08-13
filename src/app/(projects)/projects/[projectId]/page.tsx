interface PageProps {
  params: { projectId: string };
}

export default async function Page({ params }: PageProps) {
  return (
    <div className="flex h-full">
      <h1>{params.projectId}</h1>
    </div>
  );
}
