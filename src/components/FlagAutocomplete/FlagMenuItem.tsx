import { MenuItem, type MenuItemProps } from 'react-aria-components';
import { cn } from '@heroui/react';
import { COUNTRIES, type HeroTelInputCountry } from '../../constants/countries';
import { Flag } from '../Flag/Flag';

export type FlagMenuItemProps = Omit<MenuItemProps, 'children'> & {
  isoCode: HeroTelInputCountry | null;
  name: string;
  unknownFlagElement: React.ReactNode;
  classNames?: FlagMenuItemClassNames;
  active?: boolean;
};

export type FlagMenuItemClassNames = {
  menuItem?: string;
};

export const FlagMenuItem = (props: FlagMenuItemProps) => {
  const {
    isoCode,
    name,
    unknownFlagElement,
    classNames,
    active,
    className,
    ...menuItemProps
  } = props;
  const { menuItem } = classNames || {};
  return (
    <MenuItem
      {...menuItemProps}
      textValue={name}
      aria-label={isoCode ? `${name} - ${isoCode}` : name}
      className={({ isFocused, isPressed }) =>
        cn(
          'group box-border flex w-full cursor-default items-center rounded-md px-3 py-2 outline-none',
          'text-foreground',
          isFocused && 'bg-accent text-accent-foreground',
          isPressed && 'bg-accent-hover',
          active && 'bg-accent/20',
          menuItem,
          className
        ) ?? ''
      }
    >
      <div className="flex w-full flex-row items-center gap-2 p-1">
        <div className="box-content flex flex-1 flex-row items-center gap-2 overflow-hidden">
          <Flag isoCode={isoCode} unknownFlagElement={unknownFlagElement} />
          <span className="truncate">{name}</span>
        </div>
        {isoCode && (
          <span className="min-w-8 flex-shrink-0 text-end text-sm">
            +{COUNTRIES[isoCode]?.[0]}
          </span>
        )}
      </div>
    </MenuItem>
  );
};
