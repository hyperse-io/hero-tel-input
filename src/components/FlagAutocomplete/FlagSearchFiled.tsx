import { Input, TextField } from 'react-aria-components';
import { cn } from '@heroui/react';

export type FlagSearchFiledProps = {
  ariaLabel?: string;
  placeholder?: string;
  classNames?: FlagSearchFiledClassNames;
};

export type FlagSearchFiledClassNames = {
  textField?: string;
  searchInput?: string;
};

export const FlagSearchFiled = (props: FlagSearchFiledProps) => {
  const {
    ariaLabel = 'Search countries',
    placeholder = 'Search countries…',
    classNames,
  } = props;
  const { textField, searchInput } = classNames || {};
  return (
    <TextField
      aria-label={ariaLabel}
      className={cn(
        'placeholder-foreground/70 flex flex-col rounded-md px-3 py-2 outline-none',
        textField
      )}
    >
      <Input
        autoFocus
        placeholder={placeholder}
        className={cn(
          'text-foreground-900 bg-content3 focus-visible:ring-primary-500 rounded-lg border-solid px-3 py-2 text-base leading-5 outline-hidden focus-visible:ring-2',
          searchInput
        )}
      />
    </TextField>
  );
};
