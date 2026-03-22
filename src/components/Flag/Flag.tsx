'use client';

import { useMemo } from 'react';
import type { HeroTelInputCountry } from '../../constants/countries';
import { getDefaultImageSrc } from '../../helpers/helper-flag';

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
      <img
        className="shrink-0 rounded-none object-cover"
        width={32}
        height={24}
        src={getDefaultImageSrc(isoCode)}
        alt={isoCode}
        loading="lazy"
      />
    );
  }, [isoCode, unknownFlagElement]);
};
