'use client';

import { type ReactNode, useMemo, useState } from 'react';
import {
  Autocomplete,
  DialogTrigger,
  Menu,
  useFilter,
} from 'react-aria-components';
import type { HeroTelInputContinent } from '../../constants/continents.js';
import {
  type HeroTelInputCountry,
  ISO_CODES,
} from '../../constants/countries.js';
import { DEFAULT_LANG } from '../../constants/lang.js';
import { filterCountries } from '../../helpers/helper-country.js';
import { getDisplayNames } from '../../helpers/helper-intl.js';
import { FlagButton } from '../FlagButton/FlagButton.js';
import {
  FlagDialog,
  type FlagDialogClassNames,
  FlagDialogContent,
  type FlagDialogContentClassNames,
} from './FlagDialog.js';
import { FlagMenuItem, type FlagMenuItemClassNames } from './FlagMenuItem.js';
import { FlagModal, type FlagModalClassNames } from './FlagModal.js';
import {
  FlagModalOverlay,
  type FlagModalOverlayClassNames,
} from './FlagModalOverlay.js';
import {
  FlagSearchFiled,
  type FlagSearchFiledClassNames,
} from './FlagSearchFiled.js';

export type FlagAutocompleteClassNames = FlagDialogClassNames &
  FlagDialogContentClassNames &
  FlagMenuItemClassNames &
  FlagSearchFiledClassNames &
  FlagModalClassNames &
  FlagModalOverlayClassNames;

export type FlagAutocompleteProps = {
  isoCode: HeroTelInputCountry | null;
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
};

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

  const countriesFiltered = filterCountries(ISO_CODES, displayNames, {
    onlyCountries,
    excludedCountries,
    continents,
    preferredCountries,
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
                  <FlagSearchFiled classNames={{ textField, searchInput }} />
                  <Menu
                    items={countriesFilteredList}
                    className="mt-2 max-h-[300px] overflow-y-auto md:max-h-[50dvh]"
                  >
                    {(itemProps) => (
                      <FlagMenuItem
                        {...itemProps}
                        classNames={{ menuItem }}
                        unknownFlagElement={unknownFlagElement}
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
