'use client';

import { useMemo } from 'react';

import { isEmpty } from 'lodash';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { TopBar } from '@/components/top-bar';
import { UserMenu } from '@/components/projects/user-menu';

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(40, { message: 'Name must contain at most 40 digits' }),
  description: z.string().optional()
});

type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  name: '',
  description: ''
};

const Page = () => {
  const {
    control,
    formState: { dirtyFields, isValid },
    handleSubmit
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(schema)
  });

  const isSubmitButtonDisabled = useMemo(() => {
    return isEmpty(dirtyFields) || !isValid;
  }, [dirtyFields, isValid]);

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <main className="flex h-[100dvh] w-screen flex-col">
      <TopBar userActions={UserMenu} />
      <section className="mx-auto flex h-full w-full max-w-sm flex-col items-center justify-center px-2">
        <form
          name="createProjectForm"
          noValidate
          className="flex w-full flex-col justify-center space-y-4 px-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="name"
            control={control}
            render={({ field, formState }) => (
              <div className="flex flex-col space-y-2">
                <label>Name</label>
                <input
                  placeholder="Github clone with wings"
                  data-error={formState.errors.name}
                  className="appearance-none rounded-md border-2 border-zinc-600 bg-black/50 px-3 py-2 text-zinc-300 placeholder-zinc-300 placeholder-opacity-30 outline-none ring-zinc-600 focus:ring-1 data-[error]:border-red-500 data-[error]:ring-red-500"
                  autoComplete="off"
                  required
                  {...field}
                />
                {!!formState.errors.name && (
                  <p className="m-0 p-0 text-sm text-red-500">{formState.errors.name.message}</p>
                )}
              </div>
            )}
          />
          <button
            type="submit"
            disabled={isSubmitButtonDisabled}
            className="rounded-md bg-gradient-to-br from-primary to-secondary py-3 transition-all disabled:opacity-60"
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default Page;
