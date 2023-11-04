'use client';

import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { Task } from '@prisma/client';

import { useTaskStore } from '@/store/task-store';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { TaskSheetContent } from '@/components/task-sheet-content';

interface TaskSheetContextProps {
  isOpen: boolean;
  taskId: string | null;
  openSheet: (taskId: string) => void;
  closeSheet: () => void;
}

const TaskSheetContext = createContext<TaskSheetContextProps>({} as TaskSheetContextProps);

export function TaskSheetProvider({ children }: PropsWithChildren) {
  const tasks = useTaskStore((store) => store.tasks);

  const [taskId, setTaskId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const isOpen = !!taskId;

  const expandContent = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const minimizeContent = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const openSheet = useCallback(
    (taskId: string) => {
      if (!tasks) return;
      setTaskId(taskId);
    },
    [tasks]
  );

  const closeSheet = useCallback(() => {
    setIsExpanded(false);
    setTaskId(null);
  }, []);

  const task = useMemo<Task | null>(() => {
    if (!taskId) return null;
    return tasks?.find((task) => task.id === taskId) ?? null;
  }, [taskId, tasks]);

  const value = useMemo(() => {
    return { isOpen, taskId, openSheet, closeSheet };
  }, [closeSheet, isOpen, openSheet, taskId]);

  return (
    <TaskSheetContext.Provider value={value}>
      <Sheet open={isOpen} onOpenChange={closeSheet}>
        <SheetContent
          data-expanded={isExpanded}
          className="flex w-screen flex-col gap-0 overflow-y-auto overflow-x-hidden p-0 transition-[width] data-[expanded=true]:w-screen data-[expanded=true]:rounded-none sm:w-[clamp(600px,50vw,768px)] sm:max-w-none sm:rounded-l-xl"
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
      {children}
    </TaskSheetContext.Provider>
  );
}

export function useTaskSheet() {
  const context = useContext(TaskSheetContext);
  if (!context) {
    throw new Error('useTaskSheet must be used within a TaskSheetProvider');
  }
  return context;
}
