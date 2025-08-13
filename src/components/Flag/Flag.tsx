'use client';

import { useMemo } from 'react';
import { Avatar } from '@heroui/react';
import type { HeroTelInputCountry } from '../../constants/countries.js';
import { getDefaultImageSrc } from '../../helpers/helper-flag.js';

export type FlagProps = {
  isoCode: HeroTelInputCountry | null;
  unknownFlagElement?: React.ReactNode;
};

export const Flag = (props: FlagProps) => {
  const { isoCode, unknownFlagElement } = props;
  return useMemo(() => {
    if (!isoCode) {
      return unknownFlagElement;
    }
    return (
      <Avatar
        alt={isoCode}
        className="h-fit w-[32px] shrink-0 rounded-none object-cover"
        size="sm"
        src={getDefaultImageSrc(isoCode)}
      />
    );
  }, [isoCode, unknownFlagElement]);
};
