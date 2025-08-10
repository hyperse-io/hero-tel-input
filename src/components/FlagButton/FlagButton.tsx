'use client';

import { useMemo } from 'react';
import { Button, type ButtonProps, cn } from '@heroui/react';
import type { HeroTelInputCountry } from '../../constants/countries.js';
import { getCallingCodeOfCountry } from '../../helpers/helper-country.js';
import { getDefaultImgProps } from '../../helpers/helper-flag.js';
import { getDisplayNames } from '../../helpers/helper-intl.js';
import type { GetFlagElement } from '../../types/type-flag.js';
import { Flag } from '../Flag/Flag.js';

export type FlagButtonProps = ButtonProps & {
  isoCode: HeroTelInputCountry | null;
  forceCallingCode?: boolean;
  langOfCountryName?: string;
  disableDropdown?: boolean;
  getFlagElement: GetFlagElement;
  unknownFlagElement: React.ReactNode;
};

export const FlagButton = (props: FlagButtonProps) => {
  const {
    isoCode,
    forceCallingCode,
    langOfCountryName,
    disableDropdown,
    getFlagElement,
    unknownFlagElement,
    className,
    ...rest
  } = props;

  const displayNames = useMemo(() => {
    return getDisplayNames(langOfCountryName);
  }, [langOfCountryName]);

  const flagElement = (
    <Flag isoCode={isoCode}>
      {isoCode
        ? getFlagElement(isoCode, {
            countryName: displayNames.of(isoCode) || '',
            isSelected: true,
            imgProps: getDefaultImgProps({
              isoCode,
              countryName: displayNames.of(isoCode) || '',
            }),
          })
        : unknownFlagElement}
    </Flag>
  );

  return (
    <>
      {disableDropdown && (
        <Button
          variant="light"
          size="sm"
          className={cn('min-w-10 px-1', className)}
          startContent={flagElement}
        >
          {forceCallingCode && isoCode ? (
            <span>+{getCallingCodeOfCountry(isoCode)}</span>
          ) : null}
        </Button>
      )}
      {!disableDropdown && (
        <Button
          variant="light"
          size="sm"
          className={cn('min-w-10 px-1', className)}
          {...rest}
          startContent={flagElement}
        >
          {forceCallingCode && isoCode ? (
            <span>+{getCallingCodeOfCountry(isoCode)}</span>
          ) : null}
        </Button>
      )}
    </>
  );
};
