import type { MetadataJson } from 'libphonenumber-js';
import metaData from 'libphonenumber-js/metadata.min.json';
import { getObjectKeys } from '../helpers/helper-object';

export const COUNTRIES: MetadataJson['countries'] = metaData.countries;

export const ISO_CODES = getObjectKeys(COUNTRIES);

export type HeroTelInputCountry = (typeof ISO_CODES)[number];

export const DEFAULT_ISO_CODE: HeroTelInputCountry = 'US';
