import type { NumberType } from 'libphonenumber-js';
import type { InputProps } from '@heroui/react';
import type { HeroTelInputContinent } from '../constants/continents.js';
import type { HeroTelInputCountry } from '../constants/countries.js';

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
  | 'classNames'
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
     * No country list / The current flag is a span instead of a button.
     */
    disableDropdown?: boolean;
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
     *
     * @default false
     */
    disableFormatting?: boolean;
    /**
     * Autofocus the input when the user selects a country in the list.
     *
     * @default true
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
     * This prop let you to customize the unknown flag, changed the width or height, use CDN or SVG component, etc..
     */
    unknownFlagElement?: React.ReactNode;
    /**
     * The aria-label of the search input.
     *
     * @default "Search countries"
     */
    searchAriaLabel?: string;
    /**
     * The placeholder of the search input.
     *
     * @default "Search countries..."
     */
    searchPlaceholder?: string;
  };
