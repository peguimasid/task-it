'use client';

import { useCallback, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTaskStore } from '@/store/task-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Project, Task } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Icons } from './icons';
import { SheetTitle } from './ui/sheet';
import { toast } from './ui/use-toast';

const editTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(500, { message: 'Title can have at most 500 characters' })
});

type FormValues = z.infer<typeof editTaskSchema>;

interface UpdateTaskProps {
  data: FormValues;
  projectId: Project['id'];
  taskId: Task['id'];
}

interface UpdateTaskResponse {
  taskUpdated: Task;
}

interface TaskSheetTitleProps {
  task: Task;
}

const updatedTask = async ({ data, projectId, taskId }: UpdateTaskProps): Promise<UpdateTaskResponse> => {
  const response = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
  const responseData = await response.json();
  return responseData;
};

export const TaskSheetTitle = ({ task }: TaskSheetTitleProps) => {
  const router = useRouter();
  const { projectId }: { projectId: string } = useParams();

  const [updatingTitle, setUpdatingTitle] = useState<boolean>(false);

  const onUpdateTask = useTaskStore((store) => store.onUpdateTask);

  const defaultValues = useMemo(() => {
    return {
      title: task?.title
    };
  }, [task]);

  const form = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(editTaskSchema)
  });

  const { isValid, dirtyFields, errors } = form.formState;

  const activateTitleUpdate = useCallback(() => {
    setUpdatingTitle(true);
  }, []);

  const deactivateTitleUpdate = useCallback(() => {
    form.reset(defaultValues);
    setUpdatingTitle(false);
  }, [form, defaultValues]);

  const onSuccess = useCallback(
    ({ taskUpdated }: UpdateTaskResponse, variables: FormValues) => {
      onUpdateTask(taskUpdated);
      deactivateTitleUpdate();
      form.reset(variables);
      router.refresh();
    },
    [deactivateTitleUpdate, form, onUpdateTask, router]
  );

  const onError = useCallback(() => {
    toast({
      title: 'Something went wrong.',
      description: 'Your task was not updated. Please try again.',
      variant: 'destructive'
    });
  }, []);

  const { isLoading, mutate } = useMutation({
    mutationFn: (data) => updatedTask({ data, projectId, taskId: task.id }),
    onSuccess,
    onError
  });

  const isSubmitButtonDisabled = isEmpty(dirtyFields) || !isValid || isLoading;

  const onSubmit = useCallback((formData: FormValues) => mutate(formData), [mutate]);

  return (
    <div className="flex w-full items-center gap-2">
      {updatingTitle ? (
        <Form {...form}>
          <form
            name="updateTaskTitleForm"
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            data-has-errors={!isEmpty(errors)}
            className="flex w-full items-center justify-between gap-2 data-[has-errors=true]:items-start"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl placeholder="Title" autoFocus>
                    <Input {...field} autoComplete="off" disabled={isLoading} className="focus-visible:ring-0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="icon" className="h-9" disabled={isSubmitButtonDisabled}>
              <Icons.spinner
                data-loading={isLoading}
                className="hidden h-4 w-4 animate-spin data-[loading=true]:block"
              />
              <Icons.sendHorizontal data-loading={isLoading} className="h-4 w-4 data-[loading=true]:hidden" />
            </Button>
            <Button type="submit" size="icon" variant="outline" className="h-9" onClick={deactivateTitleUpdate}>
              <Icons.close className="h-4 w-4" />
            </Button>
          </form>
        </Form>
      ) : (
        <>
          <SheetTitle className="truncate">{task.title}</SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 gap-2 text-muted-foreground"
            onClick={activateTitleUpdate}
          >
            <Icons.pencil className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
};
