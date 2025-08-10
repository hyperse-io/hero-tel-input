import {
  CONTINENTS,
  type HeroTelInputContinent,
} from '../constants/continents.js';
import {
  COUNTRIES,
  DEFAULT_ISO_CODE,
  type HeroTelInputCountry,
} from '../constants/countries.js';
import { matchIsArray } from './helper-array.js';

type FilterCountriesOptions = {
  onlyCountries?: readonly HeroTelInputCountry[];
  excludedCountries?: readonly HeroTelInputCountry[];
  preferredCountries?: readonly HeroTelInputCountry[];
  continents?: readonly HeroTelInputContinent[];
};

export function getCallingCodeOfCountry(isoCode: HeroTelInputCountry): string {
  return COUNTRIES[isoCode]?.[0] as string;
}

export function getValidCountry(
  country?: HeroTelInputCountry
): HeroTelInputCountry {
  return country || DEFAULT_ISO_CODE;
}

export function sortPreferredCountries(
  countries: readonly HeroTelInputCountry[],
  preferredCountries: readonly HeroTelInputCountry[]
): readonly HeroTelInputCountry[] {
  return [...new Set(preferredCountries.concat(countries))];
}

export function getCountriesOfContinents(
  continents: readonly HeroTelInputContinent[]
): readonly HeroTelInputCountry[] {
  return continents.flatMap((continentCode) => {
    return CONTINENTS[continentCode];
  });
}

export function getOnlyCountries(
  countries: readonly HeroTelInputCountry[],
  onlyCountries: readonly HeroTelInputCountry[]
): readonly HeroTelInputCountry[] {
  return countries.filter((isoCode) => {
    return onlyCountries.includes(isoCode);
  });
}

export function excludeCountries(
  countries: readonly HeroTelInputCountry[],
  excludedCountries?: readonly HeroTelInputCountry[]
): readonly HeroTelInputCountry[] {
  if (matchIsArray(excludedCountries, true)) {
    return countries.filter((isoCode) => {
      return !excludedCountries.includes(isoCode);
    });
  }

  return countries;
}

export function sortAlphabeticallyCountryCodes(
  countryCodes: readonly HeroTelInputCountry[],
  displayNames: Intl.DisplayNames
): readonly HeroTelInputCountry[] {
  return [...countryCodes].sort((countryCodeA, countryCodeB) => {
    const countryA = displayNames.of(countryCodeA) as string;
    const countryB = displayNames.of(countryCodeB) as string;

    return countryA.localeCompare(countryB);
  });
}

export function filterCountries(
  countries: readonly HeroTelInputCountry[],
  displayNames: Intl.DisplayNames,
  options: FilterCountriesOptions
): readonly HeroTelInputCountry[] {
  const { onlyCountries, excludedCountries, continents, preferredCountries } =
    options;

  if (matchIsArray(onlyCountries, true)) {
    const filteredCountries = sortAlphabeticallyCountryCodes(
      getOnlyCountries(countries, onlyCountries),
      displayNames
    );

    return matchIsArray(preferredCountries, true)
      ? sortPreferredCountries(filteredCountries, preferredCountries)
      : filteredCountries;
  }

  const theCountries = matchIsArray(continents, true)
    ? getCountriesOfContinents(continents)
    : countries;

  const sortedCountries = sortAlphabeticallyCountryCodes(
    theCountries,
    displayNames
  );

  const sortedPreferredCountries = matchIsArray(preferredCountries, true)
    ? sortPreferredCountries(sortedCountries, preferredCountries)
    : sortedCountries;

  return matchIsArray(excludedCountries, true)
    ? excludeCountries(sortedPreferredCountries, excludedCountries)
    : sortedPreferredCountries;
}

export function matchContinentsIncludeCountry(
  continents: HeroTelInputContinent[],
  isoCode: HeroTelInputCountry
) {
  return continents.some((continentCode) => {
    return CONTINENTS[continentCode].includes(isoCode);
  });
}
