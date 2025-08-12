import { Input, TextField } from 'react-aria-components';
import { useMediaQuery } from 'usehooks-ts';
import { cn } from '@heroui/react';

export type FlagSearchFiledProps = {
  searchAriaLabel?: string;
  searchPlaceholder?: string;
  classNames?: FlagSearchFiledClassNames;
};

export type FlagSearchFiledClassNames = {
  textField?: string;
  searchInput?: string;
};

export const FlagSearchFiled = (props: FlagSearchFiledProps) => {
  const {
    searchAriaLabel = 'Search countries',
    searchPlaceholder = 'Search countries…',
    classNames,
  } = props;
  const { textField, searchInput } = classNames || {};
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <TextField
      aria-label={searchAriaLabel}
      className={cn(
        'placeholder-foreground/70 flex flex-col rounded-md px-3 py-2 outline-none',
        isMobile ? 'hidden' : 'flex',
        textField
      )}
    >
      <Input
        autoFocus
        placeholder={searchPlaceholder}
        className={cn(
          'text-foreground-900 bg-content3 focus-visible:ring-primary-500 outline-hidden rounded-lg border-solid px-3 py-2 text-base leading-5 focus-visible:ring-2',
          searchInput
        )}
      />
    </TextField>
  );
};
