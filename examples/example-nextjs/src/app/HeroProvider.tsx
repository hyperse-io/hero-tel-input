'use client';

import { HeroUIProvider } from '@heroui/react';

export const HeroProvider = ({ children }: { children: React.ReactNode }) => {
  return <HeroUIProvider>{children}</HeroUIProvider>;
};
