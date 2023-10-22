import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface TaskSheetContextProps {
  isOpen: boolean;
  taskId: string | null;
  openSheet: (taskId: string) => void;
  closeSheet: () => void;
}

const TaskSheetContext = createContext<TaskSheetContextProps>({} as TaskSheetContextProps);

export function TaskSheetProvider({ children }: PropsWithChildren) {
  const [taskId, setTaskId] = useState<string | null>(null);
  const isOpen = !!taskId;

  const openSheet = (taskId: string) => {
    setTaskId(taskId);
  };

  const closeSheet = () => {
    setTaskId(null);
  };

  const value = useMemo(() => {
    return { isOpen, taskId, openSheet, closeSheet };
  }, [isOpen, taskId]);

  return <TaskSheetContext.Provider value={value}>{children}</TaskSheetContext.Provider>;
}

export function useTaskSheet() {
  const context = useContext(TaskSheetContext);
  if (!context) {
    throw new Error('useTaskSheet must be used within a TaskSheetProvider');
  }
  return context;
}
