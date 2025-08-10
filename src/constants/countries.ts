import type { MetadataJson } from 'libphonenumber-js';
import metadatas from 'libphonenumber-js/metadata.min.json';
import { getObjectKeys } from '../helpers/helper-object.js';

export const COUNTRIES: MetadataJson['countries'] = metadatas.countries;

export const ISO_CODES = getObjectKeys(COUNTRIES);

export type HeroTelInputCountry = (typeof ISO_CODES)[number];

export const DEFAULT_ISO_CODE: HeroTelInputCountry = 'US';
