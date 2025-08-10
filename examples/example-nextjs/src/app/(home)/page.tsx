'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Button, Chip } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { HeroTelInput } from '@hyperse/hero-tel-input';

const ResetPwdSchema = z.object({
  phoneNumber: z.string({
    message: 'The phone number is required.',
  }),
});

export type ResetPwdInput = z.infer<typeof ResetPwdSchema>;

export default function Pages() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleSubmit, formState, register } = useForm<ResetPwdInput>({
    resolver: zodResolver(ResetPwdSchema),
    defaultValues: {},
  });

  const onSubmit = (data: ResetPwdInput) => {
    console.log('data', data);
  };

  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 overflow-auto p-12">
        <Chip color="primary" variant="flat">
          Hyperse
        </Chip>
        <HeroTelInput
          ref={inputRef}
          langOfCountryName="en"
          defaultCountry="AF"
          focusOnSelectCountry
          forceCallingCode={false}
          onChange={(event, info) => {
            console.log(event.target.value, info);
          }}
        />
        <form
          className="flex w-full flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <HeroTelInput
            langOfCountryName="en"
            defaultCountry="CN"
            isRequired
            variant="flat"
            size="lg"
            labelPlacement="outside"
            {...register('phoneNumber')}
            placeholder="Phone Number"
            errorMessage={formState.errors.phoneNumber?.message}
            isInvalid={!!formState.errors.phoneNumber}
          />

          <Button className="w-full" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
