import { ModalOverlay } from 'react-aria-components';
import { cn } from '@heroui/react';

export type FlagModalOverlayProps = {
  children: React.ReactNode;
  isDismissable?: boolean;
  classNames?: FlagModalOverlayClassNames;
};

export type FlagModalOverlayClassNames = {
  overlay?: string;
};

export const FlagModalOverlay = (props: FlagModalOverlayProps) => {
  const { classNames, children, isDismissable = true } = props;
  const { overlay } = classNames || {};
  return (
    <ModalOverlay
      isDismissable={isDismissable}
      className={({ isEntering, isExiting }) =>
        cn(
          'fixed inset-0 z-10 flex min-h-full items-center justify-center overflow-y-auto bg-black/25 p-4 text-center',
          {
            'animate-in fade-in duration-300 ease-out': isEntering,
            'animate-out fade-out duration-200 ease-in': isExiting,
          },
          overlay
        )
      }
    >
      {children}
    </ModalOverlay>
  );
};
