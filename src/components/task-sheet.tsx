import { useCallback, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTaskStore } from '@/store/task-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Project, Task } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetHeader } from '@/components/ui/sheet';
import { Icons } from '@/components/icons';

import { EditTaskForm } from './edit-task-form';
import { Form } from './ui/form';
import { toast } from './ui/use-toast';

const FormSchema = z.object({
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

export type TaskSheetFormValues = z.infer<typeof FormSchema>;

interface TaskSheetProps {
  isSheetOpen: boolean;
  onSheetOpenChange: (open: boolean) => void;
  task: Task;
}
interface UpdateTaskProps {
  data: TaskSheetFormValues;
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

export const TaskSheet = ({ task, isSheetOpen, onSheetOpenChange }: TaskSheetProps) => {
  const router = useRouter();
  const { projectId }: { projectId: string } = useParams();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const onUpdateTask = useTaskStore((store) => store.onUpdateTask);

  const defaultValues = useMemo<TaskSheetFormValues>(() => {
    return {
      title: task.title ?? '',
      status: task.status,
      priority: task?.priority ?? '',
      size: task?.size ?? '',
      tags: task?.tags ?? [],
      description: task.description ?? ''
    };
  }, [task]);

  const form = useForm<TaskSheetFormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(FormSchema)
  });

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setIsExpanded(false);
        form.reset(defaultValues);
      }
      onSheetOpenChange(open);
    },
    [defaultValues, form, onSheetOpenChange]
  );

  const handleClickExpand = useCallback(() => {
    setIsExpanded((previousValue) => !previousValue);
  }, []);

  const onSuccess = useCallback(
    ({ taskUpdated }: UpdateTaskResponse, variables: TaskSheetFormValues) => {
      onUpdateTask(taskUpdated);
      form.reset(variables);
      router.refresh();
    },
    [form, onUpdateTask, router]
  );

  const onError = useCallback(() => {
    toast({
      title: 'Something went wrong.',
      description: 'Your task was not updated. Please try again.',
      variant: 'destructive'
    });
  }, []);

  const { isLoading, mutate } = useMutation({
    mutationFn: (data) => updateTask({ data, projectId, taskId: task.id }),
    onSuccess,
    onError
  });

  const onSubmit = useCallback(
    (formData: TaskSheetFormValues) => {
      mutate(formData);
    },
    [mutate]
  );

  const isSaveButtonDisabled = useMemo(() => {
    const { isValid, dirtyFields } = form.formState;
    return isEmpty(dirtyFields) || !isValid || isLoading;
  }, [form.formState, isLoading]);

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        data-expanded={isExpanded}
        className="flex w-screen flex-col gap-0 overflow-y-auto overflow-x-hidden p-0 transition-[width] data-[expanded=true]:w-screen data-[expanded=true]:rounded-none sm:w-[50vw] sm:min-w-[600px] sm:max-w-none sm:rounded-l-xl"
      >
        <FormProvider {...form}>
          <Form {...form}>
            <form name="editTaskForm" noValidate onSubmit={form.handleSubmit(onSubmit)}>
              <SheetHeader className="sticky inset-0 flex w-full flex-row items-center space-y-0 border-b bg-card px-3 py-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleClickExpand}
                  className="hidden sm:flex"
                >
                  {isExpanded ? (
                    <Icons.arrowRightToLine className="h-5 w-5" />
                  ) : (
                    <Icons.arrowLeftToLine className="h-5 w-5" />
                  )}
                </Button>
                <div className="ml-auto flex items-center gap-3">
                  <Button type="submit" disabled={isSaveButtonDisabled} className="h-9">
                    {isLoading ? <Icons.spinner className="mr-2 h-5 w-5" /> : <Icons.check className="mr-2 h-5 w-5" />}
                    Save changes
                  </Button>
                  <SheetClose asChild>
                    <Button size="icon" variant="ghost">
                      <Icons.close className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
              </SheetHeader>
              <div className="container max-w-3xl p-8">
                <EditTaskForm task={task} />
              </div>
            </form>
          </Form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
};
