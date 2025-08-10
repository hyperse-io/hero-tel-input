'use client';

import { type ReactNode, useMemo } from 'react';
import {
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  type DropdownProps,
  DropdownTrigger,
  type MenuItemSlots,
  type MenuSlots,
  type PopoverSlots,
  type SlotsToClasses,
} from '@heroui/react';
import type { HeroTelInputContinent } from '../../constants/continents.js';
import {
  COUNTRIES,
  type HeroTelInputCountry,
  ISO_CODES,
} from '../../constants/countries.js';
import { DEFAULT_LANG } from '../../constants/lang.js';
import { filterCountries } from '../../helpers/helper-country.js';
import {
  getDefaultFlagElement,
  getDefaultImgProps,
} from '../../helpers/helper-flag.js';
import { getDisplayNames } from '../../helpers/helper-intl.js';
import type { GetFlagElement } from '../../types/type-flag.js';

export type FlagDropdownProps = Partial<Omit<DropdownProps, 'classNames'>> & {
  isoCode: HeroTelInputCountry | null;
  onlyCountries?: HeroTelInputCountry[];
  excludedCountries?: HeroTelInputCountry[];
  preferredCountries?: HeroTelInputCountry[];
  langOfCountryName?: Intl.LocalesArgument;
  continents?: HeroTelInputContinent[];
  onSelectCountry: (isoCode: HeroTelInputCountry) => void;
  getFlagElement: GetFlagElement;
  triggerButton?: ReactNode;
  classNames?: FlagDropdownClassNames;
};

export type FlagDropdownClassNames = {
  dropdown?: SlotsToClasses<PopoverSlots>;
  dropdownMenu?: SlotsToClasses<MenuSlots>;
  dropdownItem?: SlotsToClasses<MenuItemSlots>;
};

export const FlagDropdown = (props: FlagDropdownProps) => {
  const {
    isoCode,
    onSelectCountry,
    excludedCountries = [],
    onlyCountries = [],
    langOfCountryName = DEFAULT_LANG,
    continents = [],
    preferredCountries = [],
    getFlagElement = getDefaultFlagElement,
    triggerButton,
    classNames,
    ...restDropdownProps
  } = props;
  const { dropdown, dropdownMenu, dropdownItem } = classNames || {};
  const displayNames = useMemo(() => {
    return getDisplayNames(langOfCountryName);
  }, [langOfCountryName]);

  const countriesFiltered = filterCountries(ISO_CODES, displayNames, {
    onlyCountries,
    excludedCountries,
    continents,
    preferredCountries,
  });

  return (
    <Dropdown classNames={{ ...dropdown }} {...restDropdownProps}>
      <DropdownTrigger>{triggerButton}</DropdownTrigger>
      <DropdownMenu
        aria-label="Country selection"
        classNames={{
          ...dropdownMenu,
          base: cn('max-h-[50dvh] overflow-y-auto', dropdownMenu?.base),
        }}
        selectedKeys={isoCode ? [isoCode] : []}
      >
        {countriesFiltered.map((isoCodeItem) => {
          return (
            <DropdownItem
              key={isoCodeItem}
              value={isoCodeItem}
              textValue={isoCodeItem}
              startContent={getFlagElement(isoCodeItem, {
                countryName: displayNames.of(isoCodeItem) || '',
                isSelected: isoCodeItem === isoCode,
                imgProps: getDefaultImgProps({
                  isoCode: isoCodeItem,
                  countryName: displayNames.of(isoCodeItem) || '',
                }),
              })}
              classNames={{
                title: 'flex flex-row items-center justify-between gap-2',
                ...dropdownItem,
              }}
              onPress={() => {
                onSelectCountry?.(isoCodeItem);
              }}
            >
              <span>{displayNames.of(isoCodeItem) || ''}</span>
              <span className="text-sm">+{COUNTRIES[isoCodeItem]?.[0]}</span>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};
