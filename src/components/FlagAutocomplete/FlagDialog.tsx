import { Dialog } from 'react-aria-components';
import { cn } from '@heroui/react';

export type FlagDialogProps = {
  children: React.ReactNode;
  classNames?: FlagDialogClassNames;
};

export type FlagDialogClassNames = {
  dialog?: string;
};

export type FlagDialogContentClassNames = {
  dialogContent?: string;
};

export type FlagDialogContentProps = {
  children: React.ReactNode;
  classNames?: FlagDialogContentClassNames;
};

export const FlagDialog = (props: FlagDialogProps) => {
  const { classNames, children } = props;
  const { dialog } = classNames || {};
  return (
    <Dialog
      aria-label="Select country"
      className={cn('relative', 'outline-hidden', dialog)}
    >
      {children}
    </Dialog>
  );
};

export const FlagDialogContent = (props: FlagDialogContentProps) => {
  const { classNames, children } = props;
  const { dialogContent } = classNames || {};
  return (
    <div
      className={cn(
        'bg-overlay shadow-overlay flex w-[95vw] max-w-full flex-col gap-1 rounded-xl p-2 sm:w-[500px]',
        dialogContent
      )}
    >
      {children}
    </div>
  );
};
