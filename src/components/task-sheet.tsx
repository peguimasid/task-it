import { useCallback, useState } from 'react';
import { Task } from '@prisma/client';

import { Sheet, SheetContent } from '@/components/ui/sheet';

import { TaskSheetContent } from './task-sheet-content';

interface TaskSheetProps {
  task: Task | null;
  isSheetOpen: boolean;
  onSheetOpenChange: (open: boolean) => void;
}

export const TaskSheet = ({ task, isSheetOpen, onSheetOpenChange }: TaskSheetProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const expandContent = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const minimizeContent = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const closeSheet = useCallback(() => {
    setIsExpanded(false);
    onSheetOpenChange(false);
  }, [onSheetOpenChange]);

  return (
    <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
      <SheetContent
        data-expanded={isExpanded}
        className="flex w-screen flex-col gap-0 overflow-y-auto overflow-x-hidden p-0 transition-[width] data-[expanded=true]:w-screen data-[expanded=true]:rounded-none sm:w-[50vw] sm:min-w-[600px] sm:max-w-none sm:rounded-l-xl"
      >
        {task && (
          <TaskSheetContent
            task={task}
            onClose={closeSheet}
            isExpanded={isExpanded}
            expandContent={expandContent}
            minimizeContent={minimizeContent}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
