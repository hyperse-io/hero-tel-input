'use client';

import ReactDOM from 'react-dom';
import {
  Description,
  FieldError,
  InputGroup,
  Label,
  TextField,
} from '@heroui/react';
import {
  FlagAutocomplete,
  type FlagAutocompleteClassNames,
} from './components/FlagAutocomplete/index';
import { type HeroTelInputCountry } from './constants/countries';
import {
  getCallingCodeOfCountry,
  getValidCountry,
} from './helpers/helper-country';
import { defaultUnknownFlagElement } from './helpers/helper-flag';
import { refToRefs } from './helpers/helper-ref';
import { removeOccurrence } from './helpers/helper-string';
import { useEvents } from './hooks/useEvents';
import usePhoneDigits from './hooks/usePhoneDigits';
import type { HeroTelInputProps as BaseHeroTelInputProps } from './types/type-input';

export type HeroTelInputClassNames = {
  input?: string;
  textField?: string;
  inputGroup?: string;
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
    label,
    errorMessage,
    description,
    placeholder,
    ...rest
  } = props;

  const { input, textField, inputGroup, ...restClassNames } = classNames;

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
    <TextField
      className={textField}
      {...(!label ? { 'aria-label': 'Phone number' } : {})}
      {...rest}
    >
      {label && <Label>{label}</Label>}
      <InputGroup className={inputGroup}>
        <InputGroup.Prefix>
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
        </InputGroup.Prefix>
        <InputGroup.Input
          id="hero-tel-input"
          type="tel"
          ref={refToRefs([inputRef, propRef])}
          value={validInputValue}
          onChange={onInputChange}
          onBlur={handleBlur}
          onDoubleClick={handleDoubleClick}
          onFocus={handleFocus}
          onCopy={handleCopy}
          placeholder={placeholder}
          className={input}
        />
      </InputGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </TextField>
  );
};
