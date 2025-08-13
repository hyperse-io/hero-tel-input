import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import type {
  ForceCallingCodeWithDefaultCountry,
  HeroTelInputInfo,
  HeroTelInputProps,
} from '@hyperse/hero-tel-input';
import { HeroTelInput } from '@hyperse/hero-tel-input';

export type HeroTelInputComponentProps = {
  ref?:
    | React.RefObject<HTMLInputElement | null>
    | React.RefCallback<HTMLInputElement | null>;
} & ForceCallingCodeWithDefaultCountry &
  Omit<HeroTelInputProps, 'onChange' | 'forceCallingCode' | 'defaultCountry'>;

export const HeroTelInputComponent = (props: HeroTelInputComponentProps) => {
  const { label, ...rest } = props;
  const [result, setResult] = useState<{
    value: string;
    info: HeroTelInputInfo;
  }>();
  return (
    <Card className="w-full" shadow="sm">
      <CardHeader className="flex flex-col items-start gap-2">
        <p className="text-sm font-medium">{label}</p>
        <div className="w-full">
          <HeroTelInput
            {...rest}
            onChange={(value, info) => {
              setResult({
                value: value,
                info: info,
              });
            }}
          />
        </div>
      </CardHeader>
      <CardBody className="pt-0 text-sm">
        <p>value: {result?.value} </p>
        <p>info: {JSON.stringify(result?.info)}</p>
      </CardBody>
    </Card>
  );
};
