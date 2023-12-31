'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Project } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Icons } from './icons';

const createProjectSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(30, { message: 'Name can have at most 30 characters' })
});

const defaultValues = {
  name: ''
};

type FormValues = z.infer<typeof createProjectSchema>;

interface CreateProjectResponse {
  newProject: Project;
}

type CreateProjectButtonProps = ButtonProps;

const createProject = async (data: FormValues): Promise<CreateProjectResponse> => {
  const response = await fetch('/api/projects', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  const responseData = await response.json();
  return responseData;
};

export const CreateProjectButton = ({ className, variant, ...props }: CreateProjectButtonProps) => {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(createProjectSchema)
  });

  const { isValid, dirtyFields } = form.formState;

  const onSuccess = useCallback(
    ({ newProject }: CreateProjectResponse) => {
      router.refresh();
      router.push(`/projects/${newProject.id}`);
    },
    [router]
  );

  const { isLoading, mutate } = useMutation({
    mutationFn: createProject,
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className={cn('gap-2', className)} variant={variant} {...props}>
          <Plus className="h-5 w-5" />
          <p>New project</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>Choose a name to create your project</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            name="createProjectForm"
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitButtonDisabled}>
              <Icons.spinner
                data-loading={isLoading}
                className="mr-2 hidden h-4 w-4 animate-spin data-[loading=true]:block"
              />
              Send
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
