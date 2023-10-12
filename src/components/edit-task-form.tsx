import { zodResolver } from '@hookform/resolvers/zod';
import { Task } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Icons } from './icons';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface EditTaskFormProps {
  task: Task;
}

const FormSchema = z.object({
  status: z.string(),
  priority: z.string().optional()
});

type FormValues = z.infer<typeof FormSchema>;

export const EditTaskForm = ({ task }: EditTaskFormProps) => {
  const defaultValues = {
    priority: task?.priority ?? ''
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
        <div className="flex w-full flex-row gap-3">
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl className="flex w-full justify-start space-x-2 [&_svg]:!ml-auto">
                    <SelectTrigger>
                      <span className="text-muted-foreground">Priority: </span>
                      <SelectValue placeholder="Select priority">
                        <p>{field.value}</p>
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
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
