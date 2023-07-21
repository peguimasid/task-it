import { FunctionComponent, PropsWithChildren } from 'react';

import { DialogTitle, Icon, IconButton } from '@mui/material';

interface DialogHeaderProps extends PropsWithChildren {
  onClose?: () => void;
}

export const DialogHeader: FunctionComponent<DialogHeaderProps> = ({ children, onClose }) => {
  return (
    <DialogTitle textOverflow="ellipsis">
      {children}
      {!!onClose && (
        <IconButton aria-label="close" className="absolute right-2 top-2" onClick={onClose}>
          <Icon>close</Icon>
        </IconButton>
      )}
    </DialogTitle>
  );
};
