'use client';

import { Button, type ButtonProps, cn } from '@heroui/react';
import type { HeroTelInputCountry } from '../../constants/countries';
import { getCallingCodeOfCountry } from '../../helpers/helper-country';
import { Flag } from '../Flag/Flag';

export type FlagButtonProps = Omit<ButtonProps, 'children'> & {
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

  const ariaLabel = isoCode ? `Selected country: ${isoCode}` : 'Select country';

  return (
    <>
      {disableDropdown && (
        <Button
          excludeFromTabOrder
          aria-label={ariaLabel}
          variant="ghost"
          size="sm"
          className={cn(
            'min-w-10 shrink-0 px-1 hover:bg-transparent',
            className
          )}
        >
          {flagElement}
          {forceCallingCode && isoCode ? (
            <span>+{getCallingCodeOfCountry(isoCode)}</span>
          ) : null}
        </Button>
      )}
      {!disableDropdown && (
        <Button
          aria-label={ariaLabel}
          variant="ghost"
          size="sm"
          className={cn(
            'min-w-10 shrink-0 px-1 hover:bg-transparent',
            className
          )}
          {...rest}
        >
          {flagElement}
          {forceCallingCode && isoCode ? (
            <span>+{getCallingCodeOfCountry(isoCode)}</span>
          ) : null}
        </Button>
      )}
    </>
  );
};
