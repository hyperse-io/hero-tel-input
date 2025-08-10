'use client';

import { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Input } from '@heroui/react';
import { FlagButton } from './components/FlagButton/FlagButton.js';
import { FlagDropdown } from './components/FlagDropdown/index.js';
import type { HeroTelInputCountry } from './constants/countries.js';
import {
  getCallingCodeOfCountry,
  getValidCountry,
} from './helpers/helper-country.js';
import {
  defaultUnknownFlagElement,
  getDefaultFlagElement,
} from './helpers/helper-flag.js';
import { refToRefs } from './helpers/helper-ref.js';
import { removeOccurrence } from './helpers/helper-string.js';
import { useEvents } from './hooks/useEvents.js';
import usePhoneDigits from './hooks/usePhoneDigits.js';
import type { HeroTelInputProps } from './types/type-input.js';

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
    focusOnSelectCountry,
    disableFormatting = false,
    unknownFlagElement = defaultUnknownFlagElement,
    disableDropdown,
    onDoubleClick,
    onFocus,
    onCopy,
    onBlur,
    onChange,
    getFlagElement = getDefaultFlagElement,
    classNames,
    ref: propRef,
    ...rest
  } = props;

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

    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(event, buildInputInfo('blur'));
  };

  const isoCodeWithPlus = isoCode ? `+${getCallingCodeOfCountry(isoCode)}` : '';
  const validInputValue = forceCallingCode
    ? removeOccurrence(inputValue, isoCodeWithPlus).trimStart()
    : inputValue;

  const triggerButton = useMemo(() => {
    return (
      <FlagButton
        isoCode={isoCode}
        forceCallingCode={forceCallingCode}
        langOfCountryName={langOfCountryName}
        disableDropdown={disableDropdown}
        getFlagElement={getFlagElement}
        unknownFlagElement={unknownFlagElement}
      />
    );
  }, [
    isoCode,
    getFlagElement,
    forceCallingCode,
    disableDropdown,
    langOfCountryName,
    unknownFlagElement,
  ]);

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
        startContent={
          <FlagDropdown
            isoCode={isoCode}
            onSelectCountry={handleChangeCountry}
            excludedCountries={excludedCountries}
            onlyCountries={onlyCountries}
            langOfCountryName={langOfCountryName}
            continents={continents}
            preferredCountries={preferredCountries}
            getFlagElement={getFlagElement}
            classNames={classNames}
            triggerButton={triggerButton}
          />
        }
        {...rest}
      />
    </>
  );
};
