'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod/v3';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { HeroTelInput, matchIsValidTel } from '@hyperse/hero-tel-input';
import { HeroTelInputComponent } from './HeroTelInput';
import SwitchTheme from './SwitchTheme';

const ResetPwdSchema = z.object({
  phoneNumber: z
    .string({
      message: 'The phone number is required.',
    })
    .superRefine((phoneNumber, ctx) => {
      if (!matchIsValidTel(phoneNumber)) {
        ctx.addIssue({
          code: 'custom',
          message: 'The phone number is invalid.',
        });
      }
    }),
});

export type ResetPwdInput = z.infer<typeof ResetPwdSchema>;

export default function Pages() {
  const [result, setResult] = useState<ResetPwdInput>();
  const { handleSubmit, control } = useForm<ResetPwdInput>({
    resolver: zodResolver(ResetPwdSchema),
    defaultValues: {},
  });

  const onSubmit = (data: ResetPwdInput) => {
    setResult(data);
  };

  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 overflow-auto p-12">
        <div className="flex w-full flex-row items-center justify-center gap-4">
          <Chip color="primary" variant="flat">
            Hyperse Tel Input with HeroUI
          </Chip>
          <SwitchTheme />
        </div>
        <Card className="w-full" shadow="sm">
          <CardHeader>
            <p className="text-sm font-medium">With Form</p>
          </CardHeader>
          <CardBody>
            <form
              className="flex w-full flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="phoneNumber"
                control={control}
                render={({
                  field: { ref: fieldRef, value, ...fieldProps },
                  fieldState,
                }) => (
                  <HeroTelInput
                    {...fieldProps}
                    value={value ?? ''}
                    ref={fieldRef}
                    langOfCountryName="en"
                    defaultCountry="CN"
                    preferredCountries={['CN']}
                    errorMessage={fieldState.error?.message}
                    isInvalid={fieldState.invalid}
                  />
                )}
              />
              <Button className="w-full" color="primary" type="submit">
                Submit
              </Button>
            </form>
          </CardBody>
          <CardFooter>
            <p className="text-sm font-medium">
              Result: {JSON.stringify(result)}
            </p>
          </CardFooter>
        </Card>
        <HeroTelInputComponent label="empty props" />
        <HeroTelInputComponent
          label="langOfCountryName:en"
          langOfCountryName="en"
          defaultCountry="CN"
        />
        <HeroTelInputComponent
          label="langOfCountryName:CN"
          langOfCountryName="CN"
          defaultCountry="CN"
          searchAriaLabel="搜索国家"
          searchPlaceholder="搜索国家…"
        />
        <HeroTelInputComponent label="defaultCountry:CN" defaultCountry="CN" />
        <HeroTelInputComponent
          label="forceCallingCode:true, defaultCountry:CN (isoCode is readonly)"
          forceCallingCode
          defaultCountry="CN"
        />
        <HeroTelInputComponent
          label="forceCallingCode:false, defaultCountry:CN"
          forceCallingCode={false}
          defaultCountry="CN"
        />
        <HeroTelInputComponent
          label="focusOnSelectCountry:true"
          focusOnSelectCountry
          defaultCountry="CN"
        />
        <HeroTelInputComponent
          label="onlyCountries:['FR', 'BE']"
          onlyCountries={['FR', 'BE']}
          defaultCountry="FR"
        />
        <HeroTelInputComponent
          label="excludedCountries:['CN', 'PT']"
          excludedCountries={['CN', 'PT']}
          defaultCountry="FR"
        />
        <HeroTelInputComponent
          label="preferredCountries:['FR', 'BE']"
          preferredCountries={['CN']}
          defaultCountry="CN"
        />
        <HeroTelInputComponent
          label="continents:['EU', 'OC']"
          continents={['EU', 'OC']}
          defaultCountry="CN"
        />
        <HeroTelInputComponent
          label="disableDropdown:true"
          disableDropdown
          defaultCountry="CN"
        />
        <HeroTelInputComponent
          label="disableFormatting:true"
          disableFormatting
          defaultCountry="CN"
        />

        <HeroTelInputComponent
          label="activedCountryInFirst:false"
          activedCountryInTop={false}
          defaultCountry="CN"
        />
      </div>
    </>
  );
}
