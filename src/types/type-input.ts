import type { NumberType } from 'libphonenumber-js';
import type { InputProps } from '@heroui/react';
import type { FlagDropdownClassNames } from '../components/FlagDropdown/FlagDropdown.js';
import type { HeroTelInputContinent } from '../constants/continents.js';
import type { HeroTelInputCountry } from '../constants/countries.js';
import type { GetFlagElement } from './type-flag.js';

/***
 * The reason for input change.
 * - 'country': country changed
 * - 'input': user input
 * - 'blur': input lost focus
 */
export type HeroTelInputReason = 'country' | 'input' | 'blur';

/***
 * Callback for input value change.
 * @param value - phone number string
 * @param info - phone info details
 */
export type HeroTelInputOnChange = (
  value: string,
  info: HeroTelInputInfo
) => void;

/***
 * Info object for phone input state.
 */
export interface HeroTelInputInfo {
  /** ISO country code, e.g. 'CN', or null */
  countryCode: HeroTelInputCountry | null;
  /** Country calling code, e.g. '86', or null */
  countryCallingCode: string | null;
  /** National number part, or null */
  nationalNumber: string | null;
  /** Number type (e.g. 'MOBILE'), or null */
  numberType: Exclude<NumberType, undefined> | null;
  /** E.164 formatted value, or null */
  numberValue: string | null;
  /** Change reason */
  reason: HeroTelInputReason;
}

/***
 * Base input props, omitting internal fields.
 */
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

/***
 * If forceCallingCode is true, defaultCountry is required.
 */
export type ForceCallingCodeWithDefaultCountry =
  | {
      forceCallingCode: true;
      defaultCountry: HeroTelInputCountry;
    }
  | {
      forceCallingCode?: false | undefined;
      defaultCountry?: HeroTelInputCountry;
    };

/***
 * Props for HeroTelInput component.
 */
export type HeroTelInputProps = BaseInputProps &
  ForceCallingCodeWithDefaultCountry & {
    /** Only allow these countries */
    onlyCountries?: HeroTelInputCountry[];
    /** Exclude these countries */
    excludedCountries?: HeroTelInputCountry[];
    /** Show these countries at top */
    preferredCountries?: HeroTelInputCountry[];
    /** Language for country names */
    langOfCountryName?: string;
    /** Input value */
    value?: string | undefined;
    /** Disable formatting */
    disableFormatting?: boolean;
    /** Disable country dropdown */
    disableDropdown?: boolean;
    /** Focus input after country select */
    focusOnSelectCountry?: boolean;
    /** Only allow countries in these continents */
    continents?: HeroTelInputContinent[];
    /** Blur event callback */
    onBlur?: (
      event: React.FocusEvent<HTMLInputElement>,
      info: HeroTelInputInfo
    ) => void;
    /** Value change callback */
    onChange?: HeroTelInputOnChange;
    /** Custom flag element renderer */
    getFlagElement?: GetFlagElement;
    /** Element for unknown flag */
    unknownFlagElement?: React.ReactNode;
    /** Custom class names for dropdown */
    classNames?: FlagDropdownClassNames;
  };
