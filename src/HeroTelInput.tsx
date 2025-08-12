'use client';

import ReactDOM from 'react-dom';
import { Input, type InputProps } from '@heroui/react';
import {
  FlagAutocomplete,
  type FlagAutocompleteClassNames,
} from './components/FlagAutocomplete/index.js';
import { type HeroTelInputCountry } from './constants/countries.js';
import {
  getCallingCodeOfCountry,
  getValidCountry,
} from './helpers/helper-country.js';
import { defaultUnknownFlagElement } from './helpers/helper-flag.js';
import { refToRefs } from './helpers/helper-ref.js';
import { removeOccurrence } from './helpers/helper-string.js';
import { useEvents } from './hooks/useEvents.js';
import usePhoneDigits from './hooks/usePhoneDigits.js';
import type { HeroTelInputProps as BaseHeroTelInputProps } from './types/type-input.js';

export type HeroTelInputClassNames = {
  input?: InputProps['classNames'];
};

export type HeroTelInputProps = BaseHeroTelInputProps & {
  classNames?: HeroTelInputClassNames & FlagAutocompleteClassNames;
};

export const HeroTelInput = (props: HeroTelInputProps) => {
  const {
    forceCallingCode = false,
    defaultCountry,
    value = '',
    excludedCountries,
    onlyCountries,
    langOfCountryName,
    continents,
    preferredCountries,
    focusOnSelectCountry = true,
    disableFormatting = false,
    unknownFlagElement = defaultUnknownFlagElement,
    disableDropdown,
    onDoubleClick,
    onFocus,
    onCopy,
    onBlur,
    onChange,
    classNames = {},
    ref: propRef,
    searchAriaLabel,
    searchPlaceholder,
    activedCountryInTop,
    ...rest
  } = props;

  const { input, ...restClassNames } = classNames;

  const validDefaultCountry = forceCallingCode
    ? getValidCountry(defaultCountry)
    : defaultCountry;

  const {
    onInputChange,
    onCountryChange,
    inputRef,
    isoCode,
    inputValue,
    buildInputInfo,
  } = usePhoneDigits({
    forceCallingCode,
    defaultCountry: validDefaultCountry,
    value: value ?? '',
    onChange,
    excludedCountries,
    onlyCountries,
    disableFormatting,
    continents,
  });

  const { handleDoubleClick, handleCopy, handleFocus } = useEvents({
    onDoubleClick,
    onCopy,
    onFocus,
    inputRef,
  });

  const handleChangeCountry = (newCountry: HeroTelInputCountry) => {
    ReactDOM.flushSync(() => {
      onCountryChange(newCountry);
    });

    if (focusOnSelectCountry) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(event, buildInputInfo('blur'));
  };

  const isoCodeWithPlus = isoCode ? `+${getCallingCodeOfCountry(isoCode)}` : '';
  const validInputValue = forceCallingCode
    ? removeOccurrence(inputValue, isoCodeWithPlus).trimStart()
    : inputValue;

  return (
    <>
      <Input
        id="hero-tel-input"
        type="tel"
        ref={refToRefs([inputRef, propRef])}
        value={validInputValue}
        onChange={onInputChange}
        onBlur={handleBlur}
        onDoubleClick={handleDoubleClick}
        onFocus={handleFocus}
        onCopy={handleCopy}
        classNames={input}
        startContent={
          <FlagAutocomplete
            isoCode={isoCode}
            activedCountryInTop={activedCountryInTop}
            searchAriaLabel={searchAriaLabel}
            searchPlaceholder={searchPlaceholder}
            forceCallingCode={forceCallingCode}
            disableDropdown={disableDropdown}
            unknownFlagElement={unknownFlagElement}
            onSelectCountry={handleChangeCountry}
            excludedCountries={excludedCountries}
            onlyCountries={onlyCountries}
            langOfCountryName={langOfCountryName}
            continents={continents}
            preferredCountries={preferredCountries}
            classNames={restClassNames}
          />
        }
        {...rest}
      />
    </>
  );
};
