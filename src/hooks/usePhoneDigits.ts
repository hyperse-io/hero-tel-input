import React from 'react';
import { AsYouType } from 'libphonenumber-js';
import type { HeroTelInputContinent } from '../constants/continents.js';
import { COUNTRIES, type HeroTelInputCountry } from '../constants/countries.js';
import { matchIsArray } from '../helpers/helper-array.js';
import {
  getCallingCodeOfCountry,
  matchContinentsIncludeCountry,
} from '../helpers/helper-country.js';
import { removeOccurrence } from '../helpers/helper-string.js';
import type {
  HeroTelInputInfo,
  HeroTelInputOnChange,
  HeroTelInputReason,
} from '../types/index.js';

type UsePhoneDigitsParams = {
  value: string;
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
  const [previousDefaultCountry, setPreviousDefaultCountry] = React.useState<
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

  const [previousValue, setPreviousValue] = React.useState(value);

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
      onChange?.(
        {
          target: {
            value: numberValue,
          },
        },
        {
          ...phoneInfo,
          // we show the input value but without any formatting, or country..
          countryCode: null,
          countryCallingCode: null,
          nationalNumber: null,
        }
      );
      setPreviousValue(numberValue);
      setState({
        isoCode: null,
        inputValue: numberValue,
      });
    } else {
      const valueToSet = disableFormatting ? numberValue : formattedValue;
      onChange?.(
        {
          target: {
            value: valueToSet,
          },
        },
        phoneInfo
      );
      setPreviousValue(valueToSet);
      setState({
        isoCode: country,
        inputValue: valueToSet,
      });
    }
  };

  React.useEffect(() => {
    if (!value && !previousValue && value !== previousValue) {
      setPreviousValue(value);
      const newState = getInitialState({
        initialValue: value,
        defaultCountry,
        forceCallingCode,
        disableFormatting,
      });
      previousCountryRef.current = newState.isoCode;
      setState(newState);
    }
  }, [
    value,
    previousValue,
    defaultCountry,
    forceCallingCode,
    disableFormatting,
  ]);

  React.useEffect(() => {
    if (defaultCountry !== previousDefaultCountry) {
      setPreviousDefaultCountry(defaultCountry);
      asYouTypeRef.current = new AsYouType(defaultCountry);
      const { inputValue, isoCode } = getInitialState({
        initialValue: '',
        defaultCountry,
        forceCallingCode,
        disableFormatting,
      });
      setPreviousValue(inputValue);
      asYouTypeRef.current.input(inputValue);
      previousCountryRef.current = asYouTypeRef.current.getCountry() || null;
      onChange?.(
        {
          target: {
            value: inputValue,
          },
        },
        buildInputInfo('country')
      );
      setState({
        inputValue,
        isoCode,
      });
    }
  }, [
    defaultCountry,
    previousDefaultCountry,
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

    onChange?.(
      {
        target: {
          value: newValue,
        },
      },
      {
        ...buildInputInfo('country'),
        // Some country have the same calling code, so we choose what the user has selected
        countryCode: newCountry,
      }
    );
    previousCountryRef.current = newCountry;
    setPreviousValue(newValue);
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
