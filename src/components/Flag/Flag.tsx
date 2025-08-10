'use client';

import type { HeroTelInputCountry } from '../../constants/countries.js';
import { IconSkeleton } from '../IconSkeleton/IconSkeleton.js';

export type FlagProps = {
  isoCode: HeroTelInputCountry | null;
  children: React.ReactNode;
};

export const Flag = (props: FlagProps) => {
  const { isoCode, children } = props;
  return <IconSkeleton data-testid={isoCode}>{children}</IconSkeleton>;
};
