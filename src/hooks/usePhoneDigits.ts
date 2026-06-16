import React from 'react';
import { AsYouType } from 'libphonenumber-js';
import type { HeroTelInputContinent } from '../constants/continents';
import { COUNTRIES, type HeroTelInputCountry } from '../constants/countries';
import { matchIsArray } from '../helpers/helper-array';
import {
  getCallingCodeOfCountry,
  matchContinentsIncludeCountry,
} from '../helpers/helper-country';
import { removeOccurrence } from '../helpers/helper-string';
import type {
  HeroTelInputInfo,
  HeroTelInputOnChange,
  HeroTelInputReason,
} from '../types/index';

type UsePhoneDigitsParams = {
  value: string;
  isValueControlled: boolean;
  onChange?: HeroTelInputOnChange;
  defaultCountry?: HeroTelInputCountry;
  forceCallingCode: boolean;
  disableFormatting: boolean;
  excludedCountries?: HeroTelInputCountry[];
  onlyCountries?: HeroTelInputCountry[];
  continents?: HeroTelInputContinent[];
};

type State = {
  inputValue: string;
  isoCode: HeroTelInputCountry | null;
};

type GetInitialStateParams = {
  defaultCountry?: HeroTelInputCountry;
  initialValue: string;
  forceCallingCode: boolean;
  disableFormatting: boolean;
};

/***
 * Get the initial state for the phone input.
 * @param params - GetInitialStateParams
 * @returns State
 */
export function getInitialState(params: GetInitialStateParams): State {
  const { defaultCountry, initialValue, disableFormatting, forceCallingCode } =
    params;

  const fallbackValue = defaultCountry
    ? `+${COUNTRIES[defaultCountry]?.[0] as string}`
    : '';

  const asYouType = new AsYouType(defaultCountry);
  let inputValue = asYouType.input(initialValue);

  if (forceCallingCode && inputValue === '+' && defaultCountry) {
    inputValue = `+${COUNTRIES[defaultCountry]?.[0] as string}`;
  }

  const phoneNumberValue = asYouType.getNumberValue();

  if (disableFormatting && phoneNumberValue) {
    inputValue = phoneNumberValue;
  }

  return {
    inputValue: inputValue || fallbackValue,
    isoCode: asYouType.getCountry() || defaultCountry || null,
  };
}

type Filters = {
  excludedCountries?: HeroTelInputCountry[];
  onlyCountries?: HeroTelInputCountry[];
  continents?: HeroTelInputContinent[];
};

function matchIsIsoCodeAccepted(
  isoCode: HeroTelInputCountry,
  filters: Filters
): boolean {
  const { excludedCountries, onlyCountries, continents } = filters;

  if (
    matchIsArray(excludedCountries, true) &&
    excludedCountries.includes(isoCode)
  ) {
    return false;
  }

  if (matchIsArray(onlyCountries) && !onlyCountries.includes(isoCode)) {
    return false;
  }

  if (
    matchIsArray(continents) &&
    !matchContinentsIncludeCountry(continents, isoCode)
  ) {
    return false;
  }

  return true;
}

export default function usePhoneDigits({
  value,
  isValueControlled,
  onChange,
  defaultCountry,
  onlyCountries,
  excludedCountries,
  continents,
  disableFormatting,
  forceCallingCode,
}: UsePhoneDigitsParams) {
  const previousCountryRef = React.useRef<HeroTelInputCountry | null>(
    defaultCountry || null
  );
  const asYouTypeRef = React.useRef<AsYouType>(new AsYouType(defaultCountry));
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const previousDefaultCountryRef = React.useRef<
    HeroTelInputCountry | undefined
  >(defaultCountry);
  const [state, setState] = React.useState<State>(() => {
    return getInitialState({
      initialValue: value,
      defaultCountry,
      disableFormatting,
      forceCallingCode,
    });
  });

  const previousValueRef = React.useRef(value);

  const buildInputInfo = (reason: HeroTelInputReason): HeroTelInputInfo => {
    return {
      countryCallingCode: asYouTypeRef.current.getCallingCode() || null,
      countryCode: asYouTypeRef.current.getCountry() || null,
      nationalNumber: asYouTypeRef.current.getNationalNumber(),
      numberType: asYouTypeRef.current.getNumber()?.getType() ?? null,
      numberValue: asYouTypeRef.current.getNumberValue() || null,
      reason,
    };
  };

  const matchIsIsoCodeValid = (isoCode: HeroTelInputCountry | null) => {
    return (
      isoCode &&
      matchIsIsoCodeAccepted(isoCode, {
        onlyCountries,
        excludedCountries,
        continents,
      })
    );
  };

  const typeNewValue = (inputValue: string): string => {
    asYouTypeRef.current.reset();

    return asYouTypeRef.current.input(inputValue);
  };

  const makeSureStartWithPlusOrEmpty = (inputValue: string): string => {
    return inputValue.startsWith('+') || inputValue === ''
      ? inputValue
      : `+${inputValue}`;
  };

  const makeSureStartWithPlusIsoCode = (
    inputValue: string,
    country: HeroTelInputCountry
  ): string => {
    return inputValue.startsWith('+') || inputValue === ''
      ? inputValue
      : `+${getCallingCodeOfCountry(country)}${inputValue}`;
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = forceCallingCode
      ? makeSureStartWithPlusIsoCode(
          event.target.value,
          state.isoCode as HeroTelInputCountry
        )
      : makeSureStartWithPlusOrEmpty(event.target.value);
    // formatted : e.g: +33 6 26 92..
    const formattedValue = typeNewValue(inputValue);
    const newCountryCode = asYouTypeRef.current.getCountry();
    const country =
      newCountryCode ||
      (forceCallingCode
        ? (state.isoCode as HeroTelInputCountry)
        : previousCountryRef.current);
    // Not formatted : e.g: +336269226..
    const numberValue = asYouTypeRef.current.getNumberValue() || '';
    previousCountryRef.current = country;

    const phoneInfo = buildInputInfo('input');
    // Check if the country is excluded, or not part on onlyCountries, etc..
    if (numberValue && (!country || !matchIsIsoCodeValid(country))) {
      onChange?.(numberValue, {
        ...phoneInfo,
        // we show the input value but without any formatting, or country..
        countryCode: null,
        countryCallingCode: null,
        nationalNumber: null,
      });
      previousValueRef.current = numberValue;
      setState({
        isoCode: null,
        inputValue: numberValue,
      });
    } else {
      const valueToSet = disableFormatting ? numberValue : formattedValue;
      onChange?.(numberValue, phoneInfo);
      previousValueRef.current = numberValue;
      setState({
        isoCode: country,
        inputValue: valueToSet,
      });
    }
  };

  React.useEffect(() => {
    if (!isValueControlled || value === previousValueRef.current) {
      return;
    }

    asYouTypeRef.current = new AsYouType(defaultCountry);
    const newState = getInitialState({
      initialValue: value,
      defaultCountry,
      forceCallingCode,
      disableFormatting,
    });

    asYouTypeRef.current.input(newState.inputValue);
    previousValueRef.current = value;
    previousCountryRef.current = newState.isoCode;
    setState(newState);
  }, [
    value,
    isValueControlled,
    defaultCountry,
    forceCallingCode,
    disableFormatting,
  ]);

  React.useEffect(() => {
    if (defaultCountry === previousDefaultCountryRef.current) {
      return;
    }

    previousDefaultCountryRef.current = defaultCountry;
    asYouTypeRef.current = new AsYouType(defaultCountry);
    const { inputValue, isoCode } = getInitialState({
      initialValue: isValueControlled ? value : '',
      defaultCountry,
      forceCallingCode,
      disableFormatting,
    });
    asYouTypeRef.current.input(inputValue);
    const numberValue = asYouTypeRef.current.getNumberValue() || '';

    previousValueRef.current = numberValue;
    previousCountryRef.current = asYouTypeRef.current.getCountry() || isoCode;
    onChange?.(numberValue, buildInputInfo('country'));
    setState({
      inputValue,
      isoCode,
    });
  }, [
    defaultCountry,
    value,
    isValueControlled,
    onChange,
    forceCallingCode,
    disableFormatting,
  ]);

  const onCountryChange = (newCountry: HeroTelInputCountry): void => {
    if (newCountry === state.isoCode) {
      return;
    }

    const callingCode = COUNTRIES[newCountry]?.[0] as string;
    const { inputValue, isoCode } = state;
    let inputValueWithoutCallingCode = inputValue;

    if (isoCode) {
      const callingCodeOfPreviousCountry = getCallingCodeOfCountry(isoCode);
      const callingCodeWithPlus = `+${callingCodeOfPreviousCountry}`;
      // if the input value start with wrong calling code, set it to empty string
      inputValueWithoutCallingCode = inputValue.startsWith(callingCodeWithPlus)
        ? removeOccurrence(inputValue, callingCodeWithPlus)
        : '';
    }

    // replace the old calling code with the new one, keeping the rest of the number
    let newValue = `+${callingCode}${inputValueWithoutCallingCode}`;

    if (!disableFormatting) {
      newValue = typeNewValue(newValue);
    }
    const numberValue = asYouTypeRef.current.getNumberValue() || newValue;

    onChange?.(numberValue, {
      ...buildInputInfo('country'),
      // Some country have the same calling code, so we choose what the user has selected
      countryCode: newCountry,
    });
    previousCountryRef.current = newCountry;
    previousValueRef.current = numberValue;
    setState({
      isoCode: newCountry,
      inputValue: newValue,
    });
  };

  return {
    inputValue: state.inputValue,
    isoCode: state.isoCode,
    onInputChange,
    onCountryChange,
    inputRef,
    buildInputInfo,
  };
}
