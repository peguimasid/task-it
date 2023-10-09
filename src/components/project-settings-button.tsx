'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Project as PrismaProject } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
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
import { toast } from './ui/use-toast';

const projectSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(30, { message: 'Name can have at most 30 characters' }),
  description: z.string().max(200, { message: 'Can you keep under 200 characters please?' }).optional()
});

type FormValues = z.infer<typeof projectSchema>;

type Project = Pick<PrismaProject, 'id' | 'name' | 'description'>;

const updateProject = async (data: FormValues, projectId: Project['id']): Promise<void> => {
  await fetch(`/api/projects/${projectId}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
};

interface ProjectSettingsButtonProps extends ButtonProps {
  project: Project;
}

export const ProjectSettingsButton = ({ project, className, variant, ...props }: ProjectSettingsButtonProps) => {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const defaultValues = useMemo(() => {
    return {
      name: project.name,
      description: project.description
    };
  }, [project]);

  const form = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(projectSchema)
  });

  const { isValid, dirtyFields } = form.formState;

  const onSuccess = useCallback(
    (_: unknown, variables: FormValues) => {
      toast({
        title: 'Success',
        description: 'You project has been updated'
      });
      router.refresh();
      form.reset(variables);
      setIsDialogOpen(false);
    },
    [router, form]
  );

  const onError = useCallback(() => {
    toast({
      title: 'Something went wrong.',
      description: 'Your project was not updated. Please try again.',
      variant: 'destructive'
    });
  }, []);

  const { isLoading, mutate } = useMutation({
    mutationFn: (data) => updateProject(data, project.id),
    onSuccess,
    onError
  });

  const isSubmitButtonDisabled = isEmpty(dirtyFields) || !isValid || isLoading;

  const onSubmit = useCallback((formData: FormValues) => mutate(formData), [mutate]);

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) form.reset(defaultValues);
      setIsDialogOpen(open);
    },
    [defaultValues, form]
  );

  return (
    <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className={cn('gap-2', className)} variant={variant} {...props}>
          <Icons.settings className="h-5 w-5" />
          <p className="hidden sm:block">Settings</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Project</DialogTitle>
          <DialogDescription>Enter the name and description that you most like</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            name="updateProjectForm"
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
                  <FormControl autoFocus>
                    <Input {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
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
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
