import { Modal } from 'react-aria-components';
import { cn } from '@heroui/react';

export type FlagModalClassNames = {
  modal?: string;
};

export type FlagModalProps = {
  children: React.ReactNode;
  classNames?: FlagModalClassNames;
};

export const FlagModal = (props: FlagModalProps) => {
  const { classNames, children } = props;
  const { modal } = classNames || {};
  return (
    <Modal
      className={({ isEntering, isExiting }) =>
        cn(
          {
            'animate-in zoom-in-95 duration-300 ease-out': isEntering,
            'animate-out zoom-out-95 duration-200 ease-in': isExiting,
          },
          modal
        )
      }
    >
      {children}
    </Modal>
  );
};
