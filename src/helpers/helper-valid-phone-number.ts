import { AsYouType, isValidPhoneNumber } from 'libphonenumber-js';
import type { HeroTelInputContinent } from '../constants/continents.js';
import type { HeroTelInputCountry } from '../constants/countries.js';
import {
  excludeCountries,
  getOnlyCountries,
  matchContinentsIncludeCountry,
} from './helper-country.js';

export function matchIsValidTel(
  text: string,
  options?: {
    excludedCountries?: HeroTelInputCountry[];
    onlyCountries?: HeroTelInputCountry[];
    continents?: HeroTelInputContinent[];
  }
): boolean {
  const phone = new AsYouType();
  phone.input(text);
  const country = phone.getCountry();

  if (!country) {
    return false;
  }

  if (options?.continents && options.continents.length > 0) {
    if (!matchContinentsIncludeCountry(options.continents, country)) {
      return false;
    }
  }

  if (options?.onlyCountries && options.onlyCountries.length > 0) {
    const [countryExists] = getOnlyCountries([country], options.onlyCountries);

    if (!countryExists) {
      return false;
    }
  }

  if (options?.excludedCountries && options.excludedCountries.length > 0) {
    const [countryExists] = excludeCountries(
      [country],
      options.excludedCountries
    );

    if (!countryExists) {
      return false;
    }
  }

  return isValidPhoneNumber(text);
}
