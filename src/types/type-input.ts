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
export type BaseInputProps = Omit<
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
      /**
       * Displays the calling code (e.g: +33) as read-only next to the flag and with a divider instead of as part of the input field. Needs defaultCountry prop to be defined or will default to US.
       */
      forceCallingCode: true;
      /**
       * Sets the selected country on component mount
       */
      defaultCountry: HeroTelInputCountry;
    }
  | {
      /**
       * Displays the calling code (e.g: +33) as read-only next to the flag and with a divider instead of as part of the input field. Needs defaultCountry prop to be defined or will default to US.
       */
      forceCallingCode?: false | undefined;
      /**
       * Sets the selected country on component mount
       */
      defaultCountry?: HeroTelInputCountry;
    };

/***
 * Props for HeroTelInput component.
 */
export type HeroTelInputProps = BaseInputProps &
  ForceCallingCodeWithDefaultCountry & {
    /**
     * Country codes to be included in the list of countries.
     */
    onlyCountries?: HeroTelInputCountry[];
    /**
     * Country codes to be excluded of the list of countries.
     */
    excludedCountries?: HeroTelInputCountry[];
    /**
     * Country codes to be highlighted to the top of the list of countries.
     */
    preferredCountries?: HeroTelInputCountry[];
    /**
     * An Intl locale to translate country names (see Intl locales). All countries will be translated in this language.
     */
    langOfCountryName?: string;
    /**
     * The value of the input.
     */
    value?: string | undefined;
    /**
     * Remove format (spaces..) from the input value.
     */
    disableFormatting?: boolean;
    /**
     * Autofocus the input when the user selects a country in the list.
     */
    focusOnSelectCountry?: boolean;
    /**
     * Continent codes to include a group of countries.
     */
    continents?: HeroTelInputContinent[];
    /**
     * Gets called when the input loses focus.
     */
    onBlur?: (
      event: React.FocusEvent<HTMLInputElement>,
      info: HeroTelInputInfo
    ) => void;
    /**
     * Gets called once the user updates the tel value.
     *
     * The callback gives you 2 parameters:
     *
     * - The new tel value stringified
     * - An object of different useful informations about the tel (country, extension, etc..)
     */
    onChange?: HeroTelInputOnChange;
    /**
     * By default, the flag icons are loaded from https://flagcdn.com. But, with this prop, you can customize the img element, or use another CDN, or use SVG, etc..
     *
     * getFlagElement empower you to use your own flag library, CDN, SVGs, etc. For those who desire offline functionality, it's possible as you can pass your own SVG components (no internet connection required).
     */
    getFlagElement?: GetFlagElement;
    /**
     * This prop let you to customize the unknown flag, changed the width or height, use CDN or SVG component, etc..
     */
    unknownFlagElement?: React.ReactNode;
    /**
     * Custom class names for dropdown.
     */
    classNames?: FlagDropdownClassNames;
  };
