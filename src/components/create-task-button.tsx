'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TaskStatus } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
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

const createTask = async (data: FormValues) => {
  console.log(data);
};

export const CreateTaskButton = ({ className, variant, ...props }: CreateTaskButtonProps) => {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(createProjectSchema)
  });

  const { isValid, dirtyFields, errors } = form.formState;

  const onSuccess = useCallback(() => {
    setOpen(false);
    form.reset(defaultValues);
    router.refresh();
  }, [form, router]);

  const { isLoading, mutate } = useMutation({
    mutationFn: createTask,
    onSuccess
  });

  const isSubmitButtonDisabled = useMemo(() => {
    return isEmpty(dirtyFields) || !isValid || isLoading;
  }, [dirtyFields, isValid, isLoading]);

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) form.reset(defaultValues);
      setOpen(open);
    },
    [form]
  );

  const onSubmit = useCallback((formData: FormValues) => mutate(formData), [mutate]);

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="icon" className={cn('gap-2', className)} variant={variant} {...props}>
          <Plus className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left" className="w-[425px] rounded-lg">
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
                  <FormControl>
                    <Input {...field} placeholder="Title" autoComplete="off" />
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
