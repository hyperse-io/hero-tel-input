import { heroui, type ThemeColors } from '@heroui/react';

// hero.ts
const hero = heroui({
  prefix: 'heroui', // prefix for themes variables
  addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
  defaultTheme: 'light', // default theme from the themes object
  defaultExtendTheme: 'light', // default theme to extend on custom themes
  layout: {}, // common layout tokens (applied to all themes)
  themes: {
    light: {
      layout: {}, // light theme layout tokens
      colors: {
        // FIXME: typings issue with heroui
        'code-background': '#262b36',
      } as Partial<ThemeColors>, // light theme colors
    },
    dark: {
      layout: {}, // dark theme layout tokens
      colors: {
        'code-background': '#111113',
      } as Partial<ThemeColors>, // dark theme colors
    },
    // ... custom themes
  },
});

export default hero as ReturnType<typeof heroui>['config'];
