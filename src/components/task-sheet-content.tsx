import { useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { TaskPriority, TaskSize, TaskStatus } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Project, Task } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { isEmpty } from 'lodash';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { priorities, READABLE_PRIORITY, TASK_PRIORITY_ICONS } from '@/constants/task-priorities';
import { READABLE_SIZE, sizes } from '@/constants/task-sizes';
import { READABLE_STATUS, statuses, TASK_STATUS_ICONS } from '@/constants/task-statuses';
import { useTaskStore } from '@/store/task-store';
import { cn } from '@/lib/utils';

import { Editor } from './editor';
import { EmptyPlaceholder } from './empty-placeholder';
import { Icons } from './icons';
import { NewTagButton } from './new-tag-button';
import { TaskOperations } from './task-operations';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';
import { SheetHeader } from './ui/sheet';

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

interface TaskSheetContentProps {
  task: Task;
  isExpanded: boolean;
  onClose: () => void;
  expandContent: () => void;
  minimizeContent: () => void;
}

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

export const TaskSheetContent = ({
  task,
  onClose,
  isExpanded,
  expandContent,
  minimizeContent
}: TaskSheetContentProps) => {
  const router = useRouter();
  const { projectId }: { projectId: string } = useParams();

  const onUpdateTask = useTaskStore((store) => store.onUpdateTask);

  const defaultValues = useMemo<FormValues>(() => {
    return {
      title: task.title ?? '',
      status: task.status,
      priority: task?.priority ?? '',
      size: task?.size ?? '',
      tags: task?.tags ?? [],
      description: task.description ?? ''
    };
  }, [task]);

  const form = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(updateTaskSchema)
  });

  const handleClickClose = useCallback(() => {
    minimizeContent();
    form.reset(defaultValues);
    onClose();
  }, [defaultValues, form, minimizeContent, onClose]);

  const onSuccess = useCallback(
    ({ taskUpdated }: UpdateTaskResponse, variables: FormValues) => {
      onUpdateTask(taskUpdated);
      form.reset(variables);
      router.refresh();
    },
    [form, onUpdateTask, router]
  );

  const onError = useCallback(() => {
    toast('Something went wrong.', {
      description: 'Your task was not updated. Please try again.'
    });
  }, []);

  const { isLoading, mutate } = useMutation({
    mutationFn: (data) => updateTask({ data, projectId, taskId: task.id }),
    onSuccess,
    onError
  });

  const onSubmit = useCallback(
    (formData: FormValues) => {
      mutate(formData);
    },
    [mutate]
  );

  const toggleExpand = useCallback(() => {
    isExpanded ? minimizeContent() : expandContent();
  }, [expandContent, isExpanded, minimizeContent]);

  const handleIncludeTag = useCallback(
    (newTag: string) => {
      const tags = form.getValues('tags');
      if (tags.includes(newTag)) return;
      form.setValue('tags', [...tags, newTag], { shouldDirty: true });
    },
    [form]
  );

  const handleDeleteTag = useCallback(
    (deletedTag: string) => {
      const tags = form.getValues('tags');
      const tagsWithoutDeleted = tags.filter((tag: string) => tag !== deletedTag);
      form.setValue('tags', tagsWithoutDeleted, { shouldDirty: true });
    },
    [form]
  );

  const isSaveButtonDisabled = useMemo(() => {
    const { isValid, dirtyFields } = form.formState;
    return isEmpty(dirtyFields) || !isValid || isLoading;
  }, [form.formState, isLoading]);

  return (
    <Form {...form}>
      <form name="editTaskForm" noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <SheetHeader className="sticky inset-0 z-10 flex w-full flex-row items-center space-y-0 border-b bg-card/70 px-3 py-2 backdrop-blur-sm">
          <Button type="button" variant="ghost" size="icon" onClick={toggleExpand} className="hidden sm:flex">
            {isExpanded ? (
              <Icons.arrowRightToLine className="h-5 w-5" />
            ) : (
              <Icons.arrowLeftToLine className="h-5 w-5" />
            )}
          </Button>
          <div className="ml-auto flex items-center gap-2">
            <Button type="submit" disabled={isSaveButtonDisabled} className="h-9">
              {isLoading ? <Icons.spinner className="mr-2 h-5 w-5" /> : <Icons.check className="mr-2 h-5 w-5" />}
              Save changes
            </Button>
            <TaskOperations task={task} />
            <Button type="button" size="icon" variant="ghost" onClick={handleClickClose} className="h-9 w-9">
              <Icons.close className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        <div className="container max-w-3xl p-8">
          <div className="flex w-full flex-col gap-6">
            <section className="space-y-1">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <FormControl>
                      <Input
                        {...field}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') e.preventDefault();
                        }}
                        className="truncate border-none p-0 text-3xl font-bold text-foreground outline-none focus-visible:ring-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <p className="text-sm text-muted-foreground">
                Created {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
              </p>
            </section>
            <section className="flex w-full flex-col gap-3 sm:flex-row">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => {
                  const SelectedStatusIcon = TASK_STATUS_ICONS[field.value as TaskStatus];
                  return (
                    <FormItem className="flex w-full flex-col sm:w-1/3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" role="combobox" className="w-full justify-start gap-2">
                              <span className="truncate text-muted-foreground">Status: </span>
                              <div
                                className={cn('flex items-center gap-2 truncate', {
                                  'text-sky-500 dark:text-sky-300': field.value === 'BACKLOG',
                                  'text-amber-500 dark:text-amber-200': field.value === 'IN_PROGRESS',
                                  'text-green-500 dark:text-green-300': field.value === 'DONE'
                                })}
                              >
                                <SelectedStatusIcon className="h-4 w-4" />
                                <p className="truncate">{READABLE_STATUS[field.value as TaskStatus]}</p>
                              </div>
                              <Icons.chevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search status..." className="h-10" />
                            <CommandEmpty>No status found.</CommandEmpty>
                            <CommandGroup>
                              {statuses.map((status) => {
                                const StatusIcon = TASK_STATUS_ICONS[status];
                                return (
                                  <CommandItem
                                    value={status}
                                    key={status}
                                    onSelect={() => {
                                      form.setValue('status', status, { shouldDirty: true });
                                    }}
                                  >
                                    <Icons.check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        field.value === status ? 'opacity-100' : 'opacity-0'
                                      )}
                                    />
                                    <div
                                      className={cn('flex items-center gap-2', {
                                        'text-sky-500 dark:text-sky-300': status === 'BACKLOG',
                                        'text-amber-500 dark:text-amber-200': status === 'IN_PROGRESS',
                                        'text-green-500 dark:text-green-300': status === 'DONE'
                                      })}
                                    >
                                      <StatusIcon className="h-4 w-4" />
                                      <p>{READABLE_STATUS[status]}</p>
                                    </div>
                                  </CommandItem>
                                );
                              })}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => {
                  const SelectedPriorityIcon = TASK_PRIORITY_ICONS[field.value as TaskPriority] ?? null;
                  return (
                    <FormItem className="flex w-full flex-col sm:w-1/3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" role="combobox" className="w-full justify-start gap-2">
                              <span className="truncate text-muted-foreground">Priority: </span>
                              {field.value?.length ? (
                                <div
                                  className={cn('flex items-center gap-2 truncate', {
                                    'text-red-500 dark:text-red-400': field.value === 'URGENT',
                                    'text-amber-500 dark:text-amber-300': field.value === 'HIGH',
                                    'text-green-500 dark:text-green-300': field.value === 'MEDIUM',
                                    'text-blue-500 dark:text-blue-300': field.value === 'LOW'
                                  })}
                                >
                                  <SelectedPriorityIcon className="h-4 w-4" />
                                  <p className="truncate">{READABLE_PRIORITY[field.value as TaskPriority]}</p>
                                </div>
                              ) : (
                                <p className="truncate">Select priority</p>
                              )}
                              <Icons.chevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search priority..." className="h-10" />
                            <CommandEmpty>No priority found.</CommandEmpty>
                            <CommandGroup>
                              {priorities.map((priority) => {
                                const PriorityIcon = TASK_PRIORITY_ICONS[priority];
                                return (
                                  <CommandItem
                                    value={priority}
                                    key={priority}
                                    onSelect={() => {
                                      form.setValue('priority', priority === field.value ? '' : priority, {
                                        shouldDirty: true
                                      });
                                    }}
                                  >
                                    <Icons.check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        field.value === priority ? 'opacity-100' : 'opacity-0'
                                      )}
                                    />
                                    <div
                                      className={cn('flex items-center gap-2', {
                                        'text-red-500 dark:text-red-400': priority === 'URGENT',
                                        'text-amber-500 dark:text-amber-300': priority === 'HIGH',
                                        'text-green-500 dark:text-green-300': priority === 'MEDIUM',
                                        'text-blue-500 dark:text-blue-300': priority === 'LOW'
                                      })}
                                    >
                                      <PriorityIcon className="h-4 w-4" />
                                      <p>{READABLE_PRIORITY[priority]}</p>
                                    </div>
                                  </CommandItem>
                                );
                              })}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col sm:w-1/3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" role="combobox" className="w-full justify-start gap-2">
                            <span className="truncate text-muted-foreground">Size: </span>
                            {field.value?.length ? (
                              <div className="flex items-center gap-2 truncate">
                                <Icons.ruler className="h-4 w-4" />
                                <p className="truncate">{READABLE_SIZE[field.value as TaskSize]}</p>
                              </div>
                            ) : (
                              <p className="truncate">Select size</p>
                            )}
                            <Icons.chevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search size..." className="h-10" />
                          <CommandEmpty>No size found.</CommandEmpty>
                          <CommandGroup>
                            {sizes.map((size) => (
                              <CommandItem
                                value={size}
                                key={size}
                                onSelect={() => {
                                  form.setValue('size', size === field.value ? '' : size, { shouldDirty: true });
                                }}
                              >
                                <Icons.check
                                  className={cn('mr-2 h-4 w-4', field.value === size ? 'opacity-100' : 'opacity-0')}
                                />
                                {READABLE_SIZE[size]}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </section>
            <section className="flex w-full flex-col space-y-3">
              <div className="flex flex-row justify-between">
                <h1 className="font-medium text-muted-foreground">Tags</h1>
                <NewTagButton variant="ghost" className="h-8" onSubmitTag={handleIncludeTag} />
              </div>
              <div className="flex flex-wrap gap-2">
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) =>
                    field.value?.length ? (
                      <>
                        {field.value?.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1.5 px-2.5 text-sm">
                            <p>{tag}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-3 w-3"
                              onClick={() => handleDeleteTag(tag)}
                            >
                              <Icons.close />
                            </Button>
                          </Badge>
                        ))}
                      </>
                    ) : (
                      <div className="flex w-full items-center justify-center">
                        <EmptyPlaceholder className="min-h-min w-full gap-2 p-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Icons.tag className="h-4 w-4" />
                            <h1 className="text-sm">No tags</h1>
                          </div>
                        </EmptyPlaceholder>
                      </div>
                    )
                  }
                />
              </div>
            </section>
            <section className="mb-[calc(30vh)] min-h-[200px] w-full space-y-3">
              <h1 className="font-medium text-muted-foreground">Description</h1>
              <Separator />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <Editor
                    defaultValue={field.value}
                    onChange={field.onChange}
                    placeholder="Type here to write your description..."
                  />
                )}
              />
            </section>
          </div>
        </div>
      </form>
    </Form>
  );
};
