import { DEFAULT_LANG } from '../constants/lang.js';

export function getDisplayNames(
  lang: Intl.LocalesArgument = DEFAULT_LANG
): Intl.DisplayNames {
  try {
    return new Intl.DisplayNames(lang, {
      type: 'region',
    });
  } catch (error) {
    return new Intl.DisplayNames(DEFAULT_LANG, {
      type: 'region',
    });
  }
}
