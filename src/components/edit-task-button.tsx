import { Task } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

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
      <SheetContent className="w-screen space-y-4 rounded-l-xl sm:w-[70vw] sm:max-w-none">
        <SheetHeader className="space-y-1 text-left">
          <SheetTitle>{task.title}</SheetTitle>
          <SheetDescription>Created {formatDistanceToNow(task.createdAt, { addSuffix: true })}</SheetDescription>
        </SheetHeader>
        <div className="h-[700px] w-full rounded-lg border"></div>
        <div className="flex w-full justify-end">
          <Button type="submit" className="ml-auto w-36">
            Save changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
