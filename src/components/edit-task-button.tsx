import { Task } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface EditTaskButtonProps {
  task: Task;
}

export const EditTaskButton = ({ task }: EditTaskButtonProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="h-0 p-0 font-semibold leading-none tracking-tight">
          {task.title}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-screen flex-col space-y-4 overflow-y-auto sm:w-[70vw] sm:max-w-none sm:rounded-l-xl">
        <SheetHeader className="space-y-1 text-left">
          <SheetTitle>{task.title}</SheetTitle>
          <SheetDescription>
            Created {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
          </SheetDescription>
        </SheetHeader>
        <div className="flex w-full flex-col gap-6 lg:flex-row">
          <div className="min-h-[500px] w-full rounded-lg border lg:min-h-[700px] lg:w-3/4" />
          <div className="h-96 w-full rounded-lg border lg:w-1/4" />
        </div>
      </SheetContent>
    </Sheet>
  );
};
