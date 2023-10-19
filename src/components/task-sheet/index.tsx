import { useCallback, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task } from '@prisma/client';
import { isEmpty } from 'lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetHeader } from '@/components/ui/sheet';
import { Icons } from '@/components/icons';

import { EditTaskForm } from './edit-task-form';

const FormSchema = z.object({
  status: z.string(),
  priority: z.string().optional(),
  size: z.string().optional(),
  tags: z.array(z.string()),
  description: z.any().optional()
});

type FormValues = z.infer<typeof FormSchema>;

interface TaskSheetProps {
  isSheetOpen: boolean;
  onSheetOpenChange: (open: boolean) => void;
  task: Task;
}

export const TaskSheet = ({ task, isSheetOpen, onSheetOpenChange }: TaskSheetProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const defaultValues = useMemo<FormValues>(() => {
    return {
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
    resolver: zodResolver(FormSchema)
  });

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) setIsExpanded(false);
      onSheetOpenChange(open);
    },
    [onSheetOpenChange]
  );

  const handleClickExpand = useCallback(() => {
    setIsExpanded((previousValue) => !previousValue);
  }, []);

  const isSaveButtonDisabled = useMemo(() => {
    const { isValid, dirtyFields } = form.formState;
    return isEmpty(dirtyFields) || !isValid;
  }, [form.formState]);

  return (
    <FormProvider {...form}>
      <Sheet open={isSheetOpen} onOpenChange={handleOpenChange}>
        <SheetContent
          data-expanded={isExpanded}
          className="flex w-screen flex-col gap-0 overflow-y-auto overflow-x-hidden p-0 transition-[width] data-[expanded=true]:w-screen data-[expanded=true]:rounded-none sm:w-[50vw] sm:min-w-[600px] sm:max-w-none sm:rounded-l-xl"
        >
          <SheetHeader className="sticky inset-0 flex w-full flex-row items-center space-y-0 border-b bg-card px-3 py-2">
            <Button variant="ghost" size="icon" onClick={handleClickExpand}>
              {isExpanded ? (
                <Icons.arrowRightToLine className="h-5 w-5" />
              ) : (
                <Icons.arrowLeftToLine className="h-5 w-5" />
              )}
            </Button>
            <div className="ml-auto flex items-center gap-3">
              <Button disabled={isSaveButtonDisabled} className="h-9">
                <Icons.check className="mr-2 h-5 w-5" />
                Save changes
              </Button>
              <SheetClose asChild>
                <Button size="icon" variant="ghost">
                  <Icons.close className="h-5 w-5" />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>
          <div className="container max-w-3xl p-8">
            <EditTaskForm task={task} />
          </div>
        </SheetContent>
      </Sheet>
    </FormProvider>
  );
};
