'use client';

import { Button, type ButtonProps, cn } from '@heroui/react';
import type { HeroTelInputCountry } from '../../constants/countries.js';
import { getCallingCodeOfCountry } from '../../helpers/helper-country.js';
import { Flag } from '../Flag/Flag.js';

export type FlagButtonProps = ButtonProps & {
  isoCode: HeroTelInputCountry | null;
  forceCallingCode?: boolean;
  langOfCountryName?: Intl.LocalesArgument;
  disableDropdown?: boolean;
  unknownFlagElement: React.ReactNode;
};

export const FlagButton = (props: FlagButtonProps) => {
  const {
    isoCode,
    forceCallingCode,
    langOfCountryName,
    disableDropdown,
    unknownFlagElement,
    className,
    ...rest
  } = props;

  const flagElement = (
    <Flag isoCode={isoCode} unknownFlagElement={unknownFlagElement} />
  );

  return (
    <>
      {disableDropdown && (
        <Button
          tabIndex={-1}
          variant="light"
          size="sm"
          className={cn('min-w-10 flex-shrink-0 px-1', className)}
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
          className={cn('min-w-10 flex-shrink-0 px-1', className)}
          startContent={flagElement}
          {...rest}
        >
          {forceCallingCode && isoCode ? (
            <span>+{getCallingCodeOfCountry(isoCode)}</span>
          ) : null}
        </Button>
      )}
    </>
  );
};
