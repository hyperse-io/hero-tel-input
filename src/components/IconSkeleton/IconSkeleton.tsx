'use client';
import type { ReactNode } from 'react';
import { Skeleton } from '@heroui/react';
import { NoSsr } from '../NoSsr/NoSsr';

type IconSkeletonProps = {
  children: ReactNode;
};

export const IconSkeleton = ({ children }: IconSkeletonProps) => {
  return (
    <NoSsr
      fallback={
        <Skeleton className="shrink-0" style={{ width: 32, height: 24 }} />
      }
    >
      {children}
    </NoSsr>
  );
};
