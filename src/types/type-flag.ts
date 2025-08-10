import type { HeroTelInputCountry } from '../constants/countries.js';

/**
 * Get the flag element for a given country
 * @param isoCode - The ISO code of the country
 * @param countryName - The name of the country
 * @param isSelected - Whether the country is selected
 * @param imgProps - The props for the flag image
 */
export type GetFlagElement = (
  isoCode: HeroTelInputCountry,
  {
    countryName,
    isSelected,
    imgProps,
  }: {
    countryName: string;
    isSelected: boolean;
    imgProps: React.ComponentPropsWithRef<'img'>;
  }
) => React.ReactNode;
