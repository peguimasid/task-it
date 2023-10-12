import { priorities, READABLE_PRIORITY } from '@/constants/task-priorities';
import { READABLE_SIZE, sizes } from '@/constants/task-sizes';
import { READABLE_STATUS, statuses } from '@/constants/task-statuses';
import { TaskPriority, TaskSize, TaskStatus } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task } from '@prisma/client';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';

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
  size: z.string().optional()
});

type FormValues = z.infer<typeof FormSchema>;

export const EditTaskForm = ({ task }: EditTaskFormProps) => {
  const defaultValues: FormValues = {
    status: task.status,
    priority: task?.priority ?? '',
    size: task?.size ?? ''
  };

  const form = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(FormSchema)
  });

  const onSubmit = (formData: FormValues) => {
    console.log(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col sm:w-1/3">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" role="combobox" className="w-full justify-start gap-2">
                        <span className="truncate text-muted-foreground">Status: </span>
                        <p className="truncate">{READABLE_STATUS[field.value as TaskStatus]}</p>
                        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search status..." className="h-10" />
                      <CommandEmpty>No status found.</CommandEmpty>
                      <CommandGroup>
                        {statuses.map((status) => (
                          <CommandItem
                            value={status}
                            key={status}
                            onSelect={() => {
                              form.setValue('status', status);
                            }}
                          >
                            <Check
                              className={cn('mr-2 h-4 w-4', field.value === status ? 'opacity-100' : 'opacity-0')}
                            />
                            {READABLE_STATUS[status]}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col sm:w-1/3">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" role="combobox" className="w-full justify-start gap-2">
                        <span className="truncate text-muted-foreground">Priority: </span>
                        {field.value?.length ? (
                          <p className="truncate">{READABLE_PRIORITY[field.value as TaskPriority]}</p>
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
                        {priorities.map((priority) => (
                          <CommandItem
                            value={priority}
                            key={priority}
                            onSelect={() => {
                              form.setValue('priority', priority === field.value ? '' : priority);
                            }}
                          >
                            <Check
                              className={cn('mr-2 h-4 w-4', field.value === priority ? 'opacity-100' : 'opacity-0')}
                            />
                            {READABLE_PRIORITY[priority]}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
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
                          <p className="truncate">{READABLE_SIZE[field.value as TaskSize]}</p>
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
                              form.setValue('size', size === field.value ? '' : size);
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
      </form>
    </Form>
  );
};

// <div className="flex flex-col gap-6">
//   <div className="h-16 w-full rounded-lg border" />
//   <div className="relative mb-[calc(30vh)] min-h-[400px] w-full rounded-lg border"></div>
// </div>
