import { useCallback, useEffect, useMemo } from 'react';
import { priorities, READABLE_PRIORITY, TASK_PRIORITY_ICONS } from '@/constants/task-priorities';
import { READABLE_SIZE, sizes } from '@/constants/task-sizes';
import { READABLE_STATUS, statuses, TASK_STATUS_ICONS } from '@/constants/task-statuses';
import { TaskPriority, TaskSize, TaskStatus } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task } from '@prisma/client';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';

import { CreateTagButton } from './create-tag-button';
import { EmptyPlaceholder } from './empty-placeholder';
import { Icons } from './icons';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface EditTaskFormProps {
  task: Task;
}

const FormSchema = z.object({
  status: z.string(),
  priority: z.string().optional(),
  size: z.string().optional(),
  tags: z.array(z.string())
});

type FormValues = z.infer<typeof FormSchema>;

export const EditTaskForm = ({ task }: EditTaskFormProps) => {
  const defaultValues = useMemo<FormValues>(() => {
    return {
      status: task.status,
      priority: task?.priority ?? '',
      size: task?.size ?? '',
      tags: task?.tags ?? []
    };
  }, [task]);

  const form = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(FormSchema)
  });

  const handleIncludeTag = useCallback(
    (newTag: string) => {
      const tags = form.getValues('tags');
      form.setValue('tags', [...tags, newTag], { shouldDirty: true });
    },
    [form]
  );

  const handleDeleteTag = useCallback(
    (deletedTag: string) => {
      const tags = form.getValues('tags');
      const tagsWithoutDeleted = tags.filter((tag) => tag !== deletedTag);
      form.setValue('tags', tagsWithoutDeleted, { shouldDirty: true });
    },
    [form]
  );

  const data = form.watch();

  useEffect(() => {
    const { dirtyFields } = form.formState;
    console.log(dirtyFields);
    console.log(data);
  }, [form, data]);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6">
        <div className="flex w-full flex-col gap-3 sm:flex-row">
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
                          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
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
                                <Check
                                  className={cn('mr-2 h-4 w-4', field.value === status ? 'opacity-100' : 'opacity-0')}
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
                          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
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
                                <Check
                                  className={cn('mr-2 h-4 w-4', field.value === priority ? 'opacity-100' : 'opacity-0')}
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
                        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
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
                            <Check className={cn('mr-2 h-4 w-4', field.value === size ? 'opacity-100' : 'opacity-0')} />
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
        </div>
        <div className="flex w-full flex-col space-y-3">
          <div className="flex flex-row justify-between">
            <h1 className="font-medium text-muted-foreground">Tags</h1>
            <CreateTagButton variant="ghost" className="h-8" onSubmitTag={handleIncludeTag} />
          </div>
          <div className="flex flex-wrap gap-2">
            {data.tags.length ? (
              data.tags?.map((tag) => (
                <Badge variant="secondary" className="flex items-center gap-1.5 px-2.5 text-sm">
                  <p>{tag}</p>
                  <Button variant="ghost" size="icon" className="h-3 w-3" onClick={() => handleDeleteTag(tag)}>
                    <Icons.close />
                  </Button>
                </Badge>
              ))
            ) : (
              <div className="flex w-full items-center justify-center">
                <EmptyPlaceholder className="min-h-min w-full gap-2 p-4">
                  <div className="flex items-center gap-2">
                    <Icons.tag className="h-4 w-4" />
                    <h1 className="text-sm">No tags</h1>
                  </div>
                </EmptyPlaceholder>
              </div>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

// <div className="flex flex-col gap-6">
//   <div className="h-16 w-full rounded-lg border" />
//   <div className="relative mb-[calc(30vh)] min-h-[400px] w-full rounded-lg border"></div>
// </div>
