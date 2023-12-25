'use client';

import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Project, Task } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useTaskStore } from '@/store/task-store';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import { Icons } from '@/components/icons';
import { TaskOperations } from '@/components/task-operations';
import { TaskSheetContent } from '@/components/task-sheet-content';

const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Empty titles are not allowed' })
    .max(500, { message: 'Title can have at most 500 characters' }),
  status: z.string(),
  priority: z.string().optional(),
  size: z.string().optional(),
  tags: z.array(z.string()),
  description: z.any().optional()
});

type FormValues = z.infer<typeof updateTaskSchema>;

interface UpdateTaskProps {
  data: FormValues;
  projectId: Project['id'];
  taskId: Task['id'];
}

interface UpdateTaskResponse {
  taskUpdated: Task;
}

const updateTask = async ({ data, projectId, taskId }: UpdateTaskProps): Promise<UpdateTaskResponse> => {
  const response = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
  const responseData = await response.json();
  return responseData;
};

interface TaskSheetContextProps {
  isOpen: boolean;
  taskId: string | null;
  openSheet: (taskId: string) => void;
  closeSheet: () => void;
}

const TaskSheetContext = createContext<TaskSheetContextProps>({} as TaskSheetContextProps);

export function TaskSheetProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const { projectId } = useParams<{ projectId: string }>();
  const tasks = useTaskStore((store) => store.tasks);
  const onUpdateTask = useTaskStore((store) => store.onUpdateTask);

  const [taskId, setTaskId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isOpen = !!taskId;

  const task = useMemo<Task | null>(() => {
    if (!taskId) return null;
    return tasks?.find((task) => task.id === taskId) ?? null;
  }, [taskId, tasks]);

  const defaultValues = useMemo<FormValues>(() => {
    return {
      title: task?.title ?? '',
      status: task?.status ?? '',
      priority: task?.priority ?? '',
      size: task?.size ?? '',
      tags: task?.tags ?? [],
      description: task?.description ?? ''
    };
  }, [task]);

  const form = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(updateTaskSchema)
  });

  const expandContent = useCallback(() => setIsExpanded(true), []);
  const minimizeContent = useCallback(() => setIsExpanded(false), []);
  const toggleExpand = useCallback(() => {
    isExpanded ? minimizeContent() : expandContent();
  }, [expandContent, isExpanded, minimizeContent]);

  const onSuccess = useCallback(
    ({ taskUpdated }: UpdateTaskResponse, variables: FormValues) => {
      onUpdateTask(taskUpdated);
      form.reset(variables);
      router.refresh();
    },
    [form, onUpdateTask, router]
  );

  const onError = useCallback(() => {
    toast.error('Something went wrong.', {
      description: 'Your task was not updated. Please try again.'
    });
  }, []);

  const { isLoading, mutate } = useMutation({
    mutationFn: (data) => updateTask({ data, projectId, taskId: task!.id }),
    onSuccess,
    onError
  });

  const onSubmit = useCallback((formData: FormValues) => mutate(formData), [mutate]);

  const openSheet = useCallback(
    (taskId: string) => {
      if (!tasks) return;
      setTaskId(taskId);
    },
    [tasks]
  );

  const closeSheet = useCallback(() => {
    minimizeContent();
    form.reset(defaultValues);
    setIsExpanded(false);
    setTaskId(null);
  }, [defaultValues, form, minimizeContent]);

  const isSaveButtonDisabled = useMemo(() => {
    const { isValid, dirtyFields } = form.formState;
    return isEmpty(dirtyFields) || !isValid || isLoading;
  }, [form.formState, isLoading]);

  const value = useMemo(() => {
    return { isOpen, taskId, openSheet, closeSheet };
  }, [closeSheet, isOpen, openSheet, taskId]);

  useEffect(() => {
    if (!task) return;
    form.reset(defaultValues);
  }, [task, form, defaultValues]);

  return (
    <TaskSheetContext.Provider value={value}>
      <Sheet open={isOpen} onOpenChange={closeSheet}>
        <SheetContent
          data-expanded={isExpanded}
          className="flex w-screen flex-col gap-0 overflow-y-auto overflow-x-hidden p-0 transition-[width] data-[expanded=true]:w-screen data-[expanded=true]:rounded-none sm:w-[clamp(600px,50vw,768px)] sm:max-w-none sm:rounded-l-xl"
        >
          {task && (
            <Form {...form}>
              <form name="editTaskForm" noValidate onSubmit={form.handleSubmit(onSubmit)}>
                <SheetHeader className="sticky inset-0 z-10 flex w-full flex-row items-center space-y-0 border-b bg-card/70 px-3 py-2 backdrop-blur-sm">
                  <Button type="button" variant="ghost" size="icon" onClick={toggleExpand} className="hidden sm:flex">
                    {isExpanded ? (
                      <Icons.arrowRightToLine className="size-5" />
                    ) : (
                      <Icons.arrowLeftToLine className="size-5" />
                    )}
                  </Button>
                  <div className="ml-auto flex items-center gap-2">
                    <Button type="submit" disabled={isSaveButtonDisabled} className="h-9">
                      {isLoading ? <Icons.spinner className="size-5 mr-2" /> : <Icons.check className="size-5 mr-2" />}
                      Save changes
                    </Button>
                    <TaskOperations task={task} />
                    <Button type="button" size="icon" variant="ghost" onClick={closeSheet} className="size-9">
                      <Icons.close className="size-4" />
                    </Button>
                  </div>
                </SheetHeader>
                <TaskSheetContent task={task} />
              </form>
            </Form>
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
