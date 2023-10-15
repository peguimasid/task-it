import { useCallback, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { isEmpty } from 'lodash';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Icons } from './icons';

const tagSchema = z.object({
  tag: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(20, { message: 'Tag can have at most 20 characters' })
});

const defaultValues = {
  tag: ''
};

type FormValues = z.infer<typeof tagSchema>;

interface CreateTagButtonProps extends ButtonProps {
  onSubmitTag: (tag: string) => void;
}

export const CreateTagButton = ({ className, variant, onSubmitTag, ...props }: CreateTagButtonProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const form = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(tagSchema)
  });

  const { isValid, dirtyFields, errors } = form.formState;

  const isSubmitButtonDisabled = useMemo(() => {
    return isEmpty(dirtyFields) || !isValid;
  }, [dirtyFields, isValid]);

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) form.reset(defaultValues);
      setIsPopoverOpen(open);
    },
    [form]
  );

  const onSubmit = useCallback(
    ({ tag }: FormValues) => {
      onSubmitTag(tag);
      onOpenChange(false);
    },
    [onOpenChange, onSubmitTag]
  );

  return (
    <Popover open={isPopoverOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" className={cn('gap-2', className)} variant={variant} {...props}>
          Add
          <Icons.plus className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left" className="w-72 rounded-lg p-3">
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
              name="tag"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl placeholder="Tag">
                    <Input {...field} autoComplete="off" className="h-9" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button type="submit" size="icon" className="h-9" disabled={isSubmitButtonDisabled}>
              <Icons.sendHorizontal className="h-4 w-4" />
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
