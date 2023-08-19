'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Project as PrismaProject } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from './ui/use-toast';

const projectSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(30, { message: 'Name can have at most 30 characters' }),
  description: z.string().max(200, { message: 'Can you keep under 200 characters please?' }).optional()
});

type FormValues = z.infer<typeof projectSchema>;

type Project = Pick<PrismaProject, 'id' | 'name' | 'description'>;

interface CreateProjectResponse {
  newProject: Project;
}

const createProject = async (data: FormValues): Promise<CreateProjectResponse> => {
  console.log(data);

  return { newProject: { id: '123', name: 'TODO', description: '' } };
};

interface UpdateProjectDataFormProps {
  project: Project;
}

export const UpdateProjectDataForm = ({ project }: UpdateProjectDataFormProps) => {
  const router = useRouter();

  const defaultValues = {
    name: project.name,
    description: project.description
  };

  const form = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(projectSchema)
  });

  const { isValid, dirtyFields } = form.formState;

  const onSuccess = useCallback(() => {
    toast({
      title: 'Success',
      description: 'You project info has been updated'
    });
    router.refresh();
  }, [router]);

  const onError = useCallback(() => {
    toast({
      title: 'Something went wrong.',
      description: 'Your project was not updated. Please try again.',
      variant: 'destructive'
    });
  }, []);

  const { isLoading, mutate } = useMutation({
    mutationFn: createProject,
    onSuccess,
    onError
  });

  const isSubmitButtonDisabled = isEmpty(dirtyFields) || !isValid || isLoading;

  const onSubmit = useCallback((formData: FormValues) => mutate(formData), [mutate]);

  return (
    <Form {...form}>
      <form name="createProjectForm" noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Project</CardTitle>
            <CardDescription>Enter the project name and description that you most like</CardDescription>
          </CardHeader>
          <CardContent className="max-w-lg space-y-4">
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
              <Loader2
                data-loading={isLoading}
                className="mr-2 hidden h-4 w-4 animate-spin data-[loading=true]:block"
              />
              Save
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};
