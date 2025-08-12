import { MenuItem, type MenuItemProps } from 'react-aria-components';
import { cn } from '@heroui/react';
import {
  COUNTRIES,
  type HeroTelInputCountry,
} from '../../constants/countries.js';
import { Flag } from '../Flag/Flag.js';

export type FlagMenuItemProps = MenuItemProps & {
  isoCode: HeroTelInputCountry | null;
  name: string;
  unknownFlagElement: React.ReactNode;
  classNames?: FlagMenuItemClassNames;
};

export type FlagMenuItemClassNames = {
  menuItem?: string;
};

export const FlagMenuItem = (props: FlagMenuItemProps) => {
  const { isoCode, name, unknownFlagElement, classNames } = props;
  const { menuItem } = classNames || {};
  return (
    <MenuItem
      {...props}
      textValue={name}
      aria-label={`${name} - ${isoCode}`}
      className={cn(
        'group box-border flex w-full cursor-default items-center rounded-md px-3 py-2 outline-none',
        'pressed:bg-primary/80 focus:text-foreground text-foreground-900 hover:bg-primary/80 focus:bg-primary',
        menuItem
      )}
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
