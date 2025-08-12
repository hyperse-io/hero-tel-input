# @hyperse/hero-tel-input

<p align="left">
  <a aria-label="Build" href="https://github.com/hyperse-io/hero-tel-input/actions?query=workflow%3ACI">
    <img alt="build" src="https://img.shields.io/github/actions/workflow/status/hyperse-io/hero-tel-input/ci-integrity.yml?branch=main&label=ci&logo=github&style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="stable version" href="https://www.npmjs.com/package/@hyperse/hero-tel-input">
    <img alt="stable version" src="https://img.shields.io/npm/v/%40hyperse%2Fhero-tel-input?branch=main&label=version&logo=npm&style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="Top language" href="https://github.com/hyperse-io/hero-tel-input/search?l=typescript">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/hyperse-io/hero-tel-input?style=flat-square&labelColor=000&color=blue">
  </a>
  <a aria-label="Licence" href="https://github.com/hyperse-io/hero-tel-input/blob/main/LICENSE.md">
    <img alt="Licence" src="https://img.shields.io/github/license/hyperse-io/hero-tel-input?style=flat-quare&labelColor=000000" />
  </a>
</p>

A modern, accessible, and feature-rich international telephone input component built with React and HeroUI. Perfect for forms that require phone number input with country selection.

## ✨ Features

- 🌍 **International Support**: Supports all countries with their respective calling codes
- 🎨 **HeroUI Integration**: Built on top of HeroUI for consistent design and theming
- 📱 **Smart Formatting**: Automatic phone number formatting based on country
- 🔍 **Country Search**: Easy country selection with search functionality
- 🚀 **TypeScript**: Full TypeScript support with comprehensive type definitions
- ♿ **Accessible**: WCAG compliant with proper ARIA attributes
- 🎯 **Form Integration**: Works seamlessly with React Hook Form and other form libraries
- 🔧 **Customizable**: Extensive customization options for flags, styling, and behavior
- 📦 **Lightweight**: Minimal bundle size with tree-shaking support

## 📦 Installation

```bash
npm install @hyperse/hero-tel-input
# or
yarn add @hyperse/hero-tel-input
# or
pnpm add @hyperse/hero-tel-input
```

## 🚀 Quick Start

```tsx
import { HeroTelInput } from '@hyperse/hero-tel-input';

function MyForm() {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <HeroTelInput
      value={phoneNumber}
      onChange={(value, info) => {
        setPhoneNumber(value);
        console.log('Phone info:', info);
      }}
      defaultCountry="US"
      placeholder="Enter phone number"
    />
  );
}
```

## 📖 Basic Usage

### Simple Implementation

```tsx
import { HeroTelInput } from '@hyperse/hero-tel-input';

function PhoneInput() {
  return (
    <HeroTelInput
      label="Phone Number"
      placeholder="Enter your phone number"
      defaultCountry="CN"
      onChange={(value, info) => {
        console.log('Value:', value);
        console.log('Country:', info.countryCode);
        console.log('Calling Code:', info.countryCallingCode);
      }}
    />
  );
}
```

### With React Hook Form

```tsx
import { Controller, useForm } from 'react-hook-form';
import { HeroTelInput, matchIsValidTel } from '@hyperse/hero-tel-input';

function PhoneForm() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="phoneNumber"
        control={control}
        rules={{
          validate: (value) => matchIsValidTel(value) || 'Invalid phone number',
        }}
        render={({ field, fieldState }) => (
          <HeroTelInput
            {...field}
            label="Phone Number"
            defaultCountry="US"
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## 🎛️ API Reference

### Props

| Prop                   | Type                                              | Default | Description                              |
| ---------------------- | ------------------------------------------------- | ------- | ---------------------------------------- |
| `value`                | `string`                                          | `''`    | The phone number value                   |
| `defaultCountry`       | `HeroTelInputCountry`                             | -       | Default country to select                |
| `forceCallingCode`     | `boolean`                                         | `false` | Force the calling code to be included    |
| `onlyCountries`        | `HeroTelInputCountry[]`                           | -       | Only allow these countries               |
| `excludedCountries`    | `HeroTelInputCountry[]`                           | -       | Exclude these countries                  |
| `preferredCountries`   | `HeroTelInputCountry[]`                           | -       | Show these countries at the top          |
| `continents`           | `HeroTelInputContinent[]`                         | -       | Only allow countries in these continents |
| `langOfCountryName`    | `string`                                          | -       | Language for country names               |
| `disableFormatting`    | `boolean`                                         | `false` | Disable phone number formatting          |
| `disableDropdown`      | `boolean`                                         | `false` | Disable country dropdown                 |
| `focusOnSelectCountry` | `boolean`                                         | -       | Focus input after country selection      |
| `onChange`             | `(value: string, info: HeroTelInputInfo) => void` | -       | Callback when value changes              |
| `onBlur`               | `(event, info: HeroTelInputInfo) => void`         | -       | Callback when input loses focus          |
| `unknownFlagElement`   | `React.ReactNode`                                 | -       | Element for unknown flags                |

### HeroTelInputInfo

```tsx
interface HeroTelInputInfo {
  countryCode: HeroTelInputCountry | null; // ISO country code (e.g., 'CN')
  countryCallingCode: string | null; // Calling code (e.g., '86')
  nationalNumber: string | null; // National number part
  numberType: NumberType | null; // Number type (e.g., 'MOBILE')
  numberValue: string | null; // E.164 formatted value
  reason: 'country' | 'input' | 'blur'; // Change reason
}
```

## 🎨 Advanced Examples

### Custom Country Filtering

```tsx
<HeroTelInput
  onlyCountries={['US', 'CA', 'MX']}
  preferredCountries={['US']}
  defaultCountry="US"
  label="North American Phone"
/>
```

### Force Calling Code

```tsx
<HeroTelInput
  forceCallingCode
  defaultCountry="CN"
  label="Chinese Phone (with +86)"
/>
```

### Custom Styling

```tsx
<HeroTelInput
  defaultCountry="FR"
  classNames={{
    base: 'custom-dropdown-base',
    trigger: 'custom-trigger',
    content: 'custom-content',
  }}
/>
```

### Form Validation

```tsx
import { matchIsValidTel } from '@hyperse/hero-tel-input';

const validatePhone = (value: string) => {
  if (!value) return 'Phone number is required';
  if (!matchIsValidTel(value)) return 'Invalid phone number';
  return true;
};
```

## 🌍 Supported Countries

The component supports all countries with their respective calling codes. You can:

- Filter by specific countries using `onlyCountries`
- Exclude countries using `excludedCountries`
- Set preferred countries using `preferredCountries`
- Filter by continents using `continents`

### Available Continents

- `'AF'` - Africa
- `'AS'` - Asia
- `'EU'` - Europe
- `'NA'` - North America
- `'OC'` - Oceania
- `'SA'` - South America

### Examples

Check out the examples in the `examples/` directory:

- `example-nextjs/` - Next.js integration example
- `website/` - Documentation website

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
