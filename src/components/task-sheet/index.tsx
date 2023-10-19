import { useCallback, useState } from 'react';
import { Task } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { EditTaskForm } from '@/components/edit-task-form';
import { Icons } from '@/components/icons';
import { TaskSheetTitle } from '@/components/task-sheet-title';

interface TaskSheetProps {
  isSheetOpen: boolean;
  onSheetOpenChange: (open: boolean) => void;
  task: Task;
}

export const TaskSheet = ({ task, isSheetOpen, onSheetOpenChange }: TaskSheetProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) setIsExpanded(false);
      onSheetOpenChange(open);
    },
    [onSheetOpenChange]
  );

  const handleClickExpand = useCallback(() => {
    setIsExpanded((previousValue) => !previousValue);
  }, []);

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        data-expanded={isExpanded}
        className="flex w-screen flex-col space-y-4 overflow-y-auto overflow-x-hidden p-8 transition-[width] data-[expanded=true]:w-screen data-[expanded=true]:rounded-none sm:w-[50vw] sm:max-w-none sm:rounded-l-xl"
      >
        <div className="container mx-auto flex h-full max-w-3xl flex-col gap-6 p-0">
          <div className="flex w-full flex-row items-start justify-between gap-6">
            <SheetHeader className="w-full space-y-1 truncate text-left">
              <TaskSheetTitle task={task} />
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
          <EditTaskForm task={task} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
