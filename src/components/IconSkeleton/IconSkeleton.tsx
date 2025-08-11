'use client';
import type { ReactNode } from 'react';
import { Skeleton } from '@heroui/react';
import { NoSsr } from '../NoSsr/NoSsr.js';

type IconSkeletonProps = {
  children: ReactNode;
};

export const IconSkeleton = ({ children }: IconSkeletonProps) => {
  return (
    <NoSsr
      fallback={
        <Skeleton
          style={{ width: 32, height: 24, borderRadius: 4, flexShrink: 0 }}
        />
      }
    >
      {children}
    </NoSsr>
  );
};
