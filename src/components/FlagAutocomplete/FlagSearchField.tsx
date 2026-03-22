import { Input, SearchField } from 'react-aria-components';
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
    <SearchField
      aria-label={searchAriaLabel}
      className={cn(
        'placeholder-foreground/70 flex flex-col rounded-md px-3 py-2 outline-none',
        textField
      )}
    >
      <Input
        autoFocus
        placeholder={searchPlaceholder}
        className={cn(
          'outline-hidden',
          'bg-surface-secondary rounded-lg border-solid px-3 py-2',
          'text-foreground text-base leading-5',
          'focus-visible:ring-accent focus-visible:ring-2',
          searchInput
        )}
      />
    </SearchField>
  );
};
