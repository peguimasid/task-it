import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { FunctionComponent, PropsWithChildren } from 'react';

interface DialogHeaderProps extends PropsWithChildren {
  onClose?: () => void;
}

export const DialogHeader: FunctionComponent<DialogHeaderProps> = ({ children, onClose }) => {
  return (
    <Dialog.Title as="h3" className="-mt-2 flex items-center justify-between text-ellipsis whitespace-nowrap">
      <p className="flex-grow-1 text-lg">{children}</p>
      {!!onClose && (
        <button aria-label="close" className="flex-shrink-0 rounded-full p-1 hover:bg-zinc-800" onClick={onClose}>
          <XMarkIcon className="h-7 w-7" />
        </button>
      )}
    </Dialog.Title>
  );
};
