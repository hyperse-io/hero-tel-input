'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { HeroUIProvider } from '@heroui/react';

export const HeroProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroUIProvider validationBehavior="aria">
      <NextThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
      </NextThemeProvider>
    </HeroUIProvider>
  );
};
