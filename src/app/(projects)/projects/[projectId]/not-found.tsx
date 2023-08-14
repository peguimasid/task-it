import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { EmptyPlaceholder } from '@/components/empty-placeholder';

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center">
      <EmptyPlaceholder className="mx-auto w-full max-w-md">
        <EmptyPlaceholder.Icon name="warning" />
        <EmptyPlaceholder.Title>Uh oh! Not Found</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>This project could not be found. Please try again.</EmptyPlaceholder.Description>
        <Button asChild variant="ghost">
          <Link href="/projects">See all projects</Link>
        </Button>
      </EmptyPlaceholder>
    </div>
  );
}
