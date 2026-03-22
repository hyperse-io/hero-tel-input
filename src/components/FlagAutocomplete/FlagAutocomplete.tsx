'use client';

import { type ReactNode, useMemo, useState } from 'react';
import {
  Autocomplete,
  DialogTrigger,
  Menu,
  useFilter,
} from 'react-aria-components';
import type { HeroTelInputContinent } from '../../constants/continents';
import { type HeroTelInputCountry, ISO_CODES } from '../../constants/countries';
import { DEFAULT_LANG } from '../../constants/lang';
import { filterCountries } from '../../helpers/helper-country';
import { getDisplayNames } from '../../helpers/helper-intl';
import { FlagButton } from '../FlagButton/FlagButton';
import {
  FlagDialog,
  type FlagDialogClassNames,
  FlagDialogContent,
  type FlagDialogContentClassNames,
} from './FlagDialog';
import { FlagMenuItem, type FlagMenuItemClassNames } from './FlagMenuItem';
import { FlagModal, type FlagModalClassNames } from './FlagModal';
import {
  FlagModalOverlay,
  type FlagModalOverlayClassNames,
} from './FlagModalOverlay';
import {
  FlagSearchField,
  type FlagSearchFieldClassNames,
  type FlagSearchFieldProps,
} from './FlagSearchField';

export type FlagAutocompleteClassNames = FlagDialogClassNames &
  FlagDialogContentClassNames &
  FlagMenuItemClassNames &
  FlagSearchFieldClassNames &
  FlagModalClassNames &
  FlagModalOverlayClassNames;

export type FlagAutocompleteProps = {
  isoCode: HeroTelInputCountry | null;
  activedCountryInTop?: boolean;
  forceCallingCode?: boolean;
  unknownFlagElement?: ReactNode;
  onlyCountries?: HeroTelInputCountry[];
  excludedCountries?: HeroTelInputCountry[];
  preferredCountries?: HeroTelInputCountry[];
  langOfCountryName?: Intl.LocalesArgument;
  disableDropdown?: boolean;
  continents?: HeroTelInputContinent[];
  onSelectCountry: (isoCode: HeroTelInputCountry) => void;
  classNames?: FlagAutocompleteClassNames;
} & Pick<FlagSearchFieldProps, 'searchAriaLabel' | 'searchPlaceholder'>;

export const FlagAutocomplete = (props: FlagAutocompleteProps) => {
  const {
    isoCode: initialIsoCode,
    onSelectCountry,
    excludedCountries = [],
    onlyCountries = [],
    disableDropdown,
    langOfCountryName = DEFAULT_LANG,
    continents = [],
    preferredCountries = [],
    forceCallingCode,
    unknownFlagElement,
    classNames = {},
    searchAriaLabel,
    searchPlaceholder,
    activedCountryInTop = true,
  } = props;

  const {
    dialog,
    dialogContent,
    menuItem,
    textField,
    searchInput,
    modal,
    overlay,
  } = classNames;
  const [isOpen, setOpen] = useState(false);
  const displayNames = useMemo(() => {
    return getDisplayNames(langOfCountryName);
  }, [langOfCountryName]);

  let mergePreferredCountries = preferredCountries;

  if (activedCountryInTop) {
    mergePreferredCountries = Array.from(
      new Set([
        ...(initialIsoCode ? [initialIsoCode] : []),
        ...preferredCountries,
      ])
    );
  }

  const countriesFiltered = filterCountries(ISO_CODES, displayNames, {
    onlyCountries,
    excludedCountries,
    continents,
    preferredCountries: mergePreferredCountries,
  });

  const countriesFilteredList = countriesFiltered.map((isoCode) => {
    return {
      id: isoCode,
      isoCode: isoCode,
      name: displayNames.of(isoCode) || '',
    };
  });

  const { contains } = useFilter({ sensitivity: 'base' });

  return (
    <>
      <DialogTrigger isOpen={isOpen} onOpenChange={setOpen}>
        <FlagButton
          isoCode={initialIsoCode}
          forceCallingCode={forceCallingCode}
          langOfCountryName={langOfCountryName}
          disableDropdown={disableDropdown}
          unknownFlagElement={unknownFlagElement}
          onPress={() => {
            setOpen(true);
          }}
        />
        <FlagModalOverlay classNames={{ overlay }}>
          <FlagModal classNames={{ modal }}>
            <FlagDialog classNames={{ dialog }}>
              <FlagDialogContent classNames={{ dialogContent }}>
                <Autocomplete filter={contains}>
                  <FlagSearchField
                    classNames={{ textField, searchInput }}
                    searchAriaLabel={searchAriaLabel}
                    searchPlaceholder={searchPlaceholder}
                  />
                  <Menu
                    aria-label="Country list"
                    items={countriesFilteredList}
                    className="mt-2 max-h-[50dvh] overflow-y-auto"
                  >
                    {(itemProps) => (
                      <FlagMenuItem
                        {...itemProps}
                        classNames={{ menuItem }}
                        unknownFlagElement={unknownFlagElement}
                        active={itemProps.isoCode === initialIsoCode}
                        onAction={() => {
                          onSelectCountry(itemProps.isoCode);
                        }}
                      />
                    )}
                  </Menu>
                </Autocomplete>
              </FlagDialogContent>
            </FlagDialog>
          </FlagModal>
        </FlagModalOverlay>
      </DialogTrigger>
    </>
  );
};
