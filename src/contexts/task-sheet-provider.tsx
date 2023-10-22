'use client';

import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { useTaskStore } from '@/store/task-store';
import { Task } from '@prisma/client';

import { TaskSheet } from '@/components/task-sheet';

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
  const isOpen = !!taskId;

  const openSheet = useCallback(
    (taskId: string) => {
      if (!tasks) return;
      setTaskId(taskId);
    },
    [tasks]
  );

  const closeSheet = () => {
    setTaskId(null);
  };

  const task = useMemo<Task | null>(() => {
    if (!taskId) return null;
    return tasks?.find((task) => task.id === taskId) ?? null;
  }, [taskId, tasks]);

  const value = useMemo(() => {
    return { isOpen, taskId, openSheet, closeSheet };
  }, [isOpen, openSheet, taskId]);

  return (
    <TaskSheetContext.Provider value={value}>
      <TaskSheet task={task} isSheetOpen={isOpen} onSheetOpenChange={closeSheet} />
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
