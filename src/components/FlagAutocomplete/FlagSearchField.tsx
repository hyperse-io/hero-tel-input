import { Input, TextField } from 'react-aria-components';
import { cn } from '@heroui/react';

export type FlagSearchFieldProps = {
  searchAriaLabel?: string;
  searchPlaceholder?: string;
  classNames?: FlagSearchFieldClassNames;
};

export type FlagSearchFieldClassNames = {
  textField?: string;
  searchInput?: string;
};

export const FlagSearchField = (props: FlagSearchFieldProps) => {
  const {
    searchAriaLabel = 'Search countries',
    searchPlaceholder = 'Search countries…',
    classNames,
  } = props;
  const { textField, searchInput } = classNames || {};
  return (
    <TextField
      aria-label={searchAriaLabel}
      className={cn(
        'placeholder-foreground/70 hidden flex-col rounded-md px-3 py-2 outline-none md:flex',
        textField
      )}
    >
      <Input
        autoFocus
        placeholder={searchPlaceholder}
        className={cn(
          'outline-hidden',
          'bg-content3 rounded-lg border-solid px-3 py-2',
          'text-foreground-900 text-base leading-5',
          'focus-visible:ring-primary-500 focus-visible:ring-2',
          searchInput
        )}
      />
    </TextField>
  );
};
