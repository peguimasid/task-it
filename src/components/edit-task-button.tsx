import { useCallback, useState } from 'react';
import { Task } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

import { Icons } from './icons';

interface EditTaskButtonProps {
  task: Task;
}

export const EditTaskButton = ({ task }: EditTaskButtonProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) setIsExpanded(false);
    setIsSheetOpen(open);
  }, []);

  const handleClickExpand = useCallback(() => {
    setIsExpanded((previousValue) => !previousValue);
  }, []);

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="link" className="h-0 p-0 font-semibold leading-none tracking-tight">
          {task.title}
        </Button>
      </SheetTrigger>
      <SheetContent
        data-expanded={isExpanded}
        className="flex w-screen flex-col space-y-4 overflow-y-auto transition-[width] data-[expanded=true]:w-screen sm:w-[50vw] sm:max-w-none sm:rounded-l-xl"
      >
        <div className="container mx-auto flex max-w-4xl flex-col gap-6 p-0">
          <div className="flex w-full flex-row justify-between">
            <SheetHeader className="space-y-1 text-left">
              <SheetTitle>{task.title}</SheetTitle>
              <SheetDescription>
                Created {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
              </SheetDescription>
            </SheetHeader>
            <div className="flex items-center space-x-2">
              <Button variant="secondary" className="hidden space-x-2 sm:flex" onClick={handleClickExpand}>
                <p>{isExpanded ? 'Collapse' : 'Expand'}</p>
                {isExpanded ? <Icons.minimize className="h-4 w-4" /> : <Icons.maximize className="h-4 w-4" />}
              </Button>
              <SheetClose asChild>
                <Button size="icon" variant="ghost">
                  <Icons.close className="h-4 w-4" />
                </Button>
              </SheetClose>
            </div>
          </div>
          <div className="h-16 w-full rounded-lg border" />
          <div className="min-h-[500px] w-full rounded-lg border" />
        </div>
      </SheetContent>
    </Sheet>
  );
};
