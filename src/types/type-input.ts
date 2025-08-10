import type { NumberType } from 'libphonenumber-js';
import type { InputProps } from '@heroui/react';
import type { FlagDropdownClassNames } from '../components/FlagDropdown/FlagDropdown.js';
import type { HeroTelInputContinent } from '../constants/continents.js';
import type { HeroTelInputCountry } from '../constants/countries.js';
import type { GetFlagElement } from './type-flag.js';

export type HeroTelInputReason = 'country' | 'input' | 'blur';

export type HeroTelInputOnChange = (
  event: {
    target: any;
    type?: any;
  },
  info: HeroTelInputInfo
) => void | boolean | Promise<void | boolean>;

export interface HeroTelInputInfo {
  countryCode: HeroTelInputCountry | null;
  countryCallingCode: string | null;
  nationalNumber: string | null;
  numberType: Exclude<NumberType, undefined> | null;
  numberValue: string | null;
  reason: HeroTelInputReason;
}

type BaseInputProps = Omit<
  InputProps,
  | 'onChange'
  | 'select'
  | 'type'
  | 'multiline'
  | 'defaultValue'
  | 'inputProps'
  | 'InputProps'
>;

type ForceCallingCodeWithDefaultCountry =
  | {
      forceCallingCode: true;
      defaultCountry: HeroTelInputCountry;
    }
  | {
      forceCallingCode?: false | undefined;
      defaultCountry?: HeroTelInputCountry;
    };

export type HeroTelInputProps = BaseInputProps &
  ForceCallingCodeWithDefaultCountry & {
    forceCallingCode?: boolean;
    onlyCountries?: HeroTelInputCountry[];
    excludedCountries?: HeroTelInputCountry[];
    preferredCountries?: HeroTelInputCountry[];
    langOfCountryName?: string;
    value?: string | undefined;
    disableFormatting?: boolean;
    disableDropdown?: boolean;
    focusOnSelectCountry?: boolean;
    continents?: HeroTelInputContinent[];
    onBlur?: (
      event: React.FocusEvent<HTMLInputElement>,
      info: HeroTelInputInfo
    ) => void;
    onChange?: HeroTelInputOnChange;
    getFlagElement?: GetFlagElement;
    unknownFlagElement?: React.ReactNode;
    classNames?: FlagDropdownClassNames;
  };
