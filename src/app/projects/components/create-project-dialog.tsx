'use client';

import { useCallback, useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Loader2, Plus } from 'lucide-react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { isEmpty } from 'lodash';
import { useMutation } from '@tanstack/react-query';

const createProjectSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(30, { message: 'Name can have at most 30 characters' }),
  description: z.string().max(200, { message: 'Can you keep under 200 characters please?' }).optional()
});

const defaultValues = {
  name: '',
  description: ''
};

type FormValues = z.infer<typeof createProjectSchema>;

interface Project {
  id: string;
  name: string;
  description?: string;
}

interface CreateProjectResponse {
  newProject: Project;
}

const createProject = async (data: FormValues): Promise<CreateProjectResponse> => {
  const response = await fetch('/api/projects', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  const responseData = await response.json();
  return responseData;
};

export const CreateProjectDialog = () => {
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

  const onSubmit = useCallback((formData: FormValues) => mutate(formData), [mutate]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2" aria-controls="">
          <Plus className="h-5 w-5" />
          <p>Create project</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>Add name and description to create your project</DialogDescription>
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
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>This is optional but is very useful</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitButtonDisabled}>
              <Loader2
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
