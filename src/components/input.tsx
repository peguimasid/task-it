import { ComponentProps, forwardRef } from 'react';

interface InputProps extends ComponentProps<'input'> {
  label?: string;
  error?: boolean;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error = false, helperText, ...rest }, ref) => {
  return (
    <div data-invalid={error} className="group">
      <label className="block text-sm font-medium leading-6">{label}</label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          ref={ref}
          className="block w-full rounded-md border-0 bg-transparent px-3 py-2 outline-none ring-2 ring-inset ring-zinc-500 placeholder:text-zinc-600 focus:ring-primary group-data-[invalid=true]:ring-red-500 sm:text-sm sm:leading-6"
          {...rest}
        />
        <p className="mt-1 text-sm text-zinc-400 group-data-[invalid=true]:text-red-500">{helperText}</p>
      </div>
    </div>
  );
});
