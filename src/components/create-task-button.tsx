import { useCallback, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTaskStore } from '@/store/task-store';
import { TaskStatus } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Project, Task } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { Loader2, Plus, SendHorizonal } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { toast } from './ui/use-toast';

const createProjectSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(500, { message: 'Title can have at most 500 characters' })
});

const defaultValues = {
  title: ''
};

type FormValues = z.infer<typeof createProjectSchema>;

interface CreateTaskButtonProps extends ButtonProps {
  status: TaskStatus;
}

interface CreateTaskResponse {
  newTask: Task;
}

interface CreateTaskProps {
  projectId: Project['id'];
  title: FormValues['title'];
  status: TaskStatus;
}

const createTask = async ({ projectId, title, status }: CreateTaskProps): Promise<CreateTaskResponse> => {
  const response = await fetch(`/api/projects/${projectId}/tasks`, {
    method: 'POST',
    body: JSON.stringify({ title, status })
  });
  const responseData = await response.json();
  return responseData;
};

export const CreateTaskButton = ({ className, variant, status, ...props }: CreateTaskButtonProps) => {
  const router = useRouter();

  const { projectId }: { projectId: string } = useParams();

  const onCreateTask = useTaskStore((store) => store.onCreateTask);

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const form = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(createProjectSchema)
  });

  const { isValid, dirtyFields, errors } = form.formState;

  const onSuccess = useCallback(
    ({ newTask }: CreateTaskResponse) => {
      form.reset(defaultValues);
      setIsPopoverOpen(false);
      onCreateTask(newTask);
      router.refresh();
    },
    [form, onCreateTask, router]
  );

  const onError = useCallback(() => {
    toast({
      title: "Task couldn't be created",
      description: 'Please try again later.',
      variant: 'destructive'
    });
  }, []);

  const { isLoading, mutate } = useMutation({
    mutationFn: createTask,
    onSuccess,
    onError
  });

  const isSubmitButtonDisabled = useMemo(() => {
    return isEmpty(dirtyFields) || !isValid || isLoading;
  }, [dirtyFields, isValid, isLoading]);

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) form.reset(defaultValues);
      setIsPopoverOpen(open);
    },
    [form]
  );

  const onSubmit = useCallback(
    ({ title }: FormValues) => {
      mutate({ projectId, title, status });
    },
    [mutate, projectId, status]
  );

  return (
    <Popover open={isPopoverOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="icon" className={cn('gap-2', className)} variant={variant} {...props}>
          <Plus className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left" className="w-80 rounded-lg">
        <Form {...form}>
          <form
            name="createProjectForm"
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            data-has-errors={!isEmpty(errors)}
            className="flex items-center justify-between gap-4 data-[has-errors=true]:items-start"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl placeholder="Title">
                    <Input {...field} autoComplete="off" disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="icon" className="h-9" disabled={isSubmitButtonDisabled}>
              <Loader2 data-loading={isLoading} className="hidden h-4 w-4 animate-spin data-[loading=true]:block" />
              <SendHorizonal data-loading={isLoading} className="h-4 w-4 data-[loading=true]:hidden" />
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
