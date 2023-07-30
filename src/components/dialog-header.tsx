import { FunctionComponent, PropsWithChildren } from 'react';

interface DialogHeaderProps extends PropsWithChildren {
  onClose?: () => void;
}

export const DialogHeader: FunctionComponent<DialogHeaderProps> = ({ children, onClose }) => {
  return <div>DIALOG HEDERS</div>;
};
