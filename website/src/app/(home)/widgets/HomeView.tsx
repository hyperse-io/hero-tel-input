'use client';

import type { FC } from 'react';
import { Link } from 'nextra-theme-docs';
import { Feature, Features } from '@/components/Features';
import { Card, HeroUIProvider } from '@heroui/react';
import { HeroTelInput } from '@hyperse/hero-tel-input/index.js';
import { Icon } from '@iconify/react';
import styles from './page.module.css';
import './page.css';

const features = [
  {
    title: 'International Support',
    icon: 'material-icon-theme:architecture',
    description: 'Supports all countries with their respective calling codes',
  },
  {
    title: 'HeroUI Integration',
    icon: 'emojione:level-slider',
    description: 'Built on top of HeroUI for consistent design and theming',
  },
  {
    title: 'Smart Formatting',
    icon: 'material-icon-theme:pipeline',
    description: 'Automatic phone number formatting based on country',
  },
  {
    title: 'Country Search',
    icon: 'material-icon-theme:folder-custom',
    description: 'Easy country selection with search functionality',
  },
  {
    title: 'TypeScript Support',
    icon: 'vscode-icons:file-type-typescript-official',
    description: 'Full TypeScript support with comprehensive type definitions',
  },
  {
    title: 'Accessible',
    icon: 'streamline-ultimate-color:performance-increase',
    description: 'WCAG compliant with proper ARIA attributes',
  },
  {
    title: 'Form Integration',
    icon: 'twemoji:flexed-biceps',
    description:
      'Works seamlessly with React Hook Form and other form libraries',
  },
  {
    title: 'Customizable',
    icon: 'logos:async-api-icon',
    description:
      'Extensive customization options for flags, styling, and behavior',
  },
];

export const HomeView: FC = () => {
  return (
    <HeroUIProvider>
      <div className="mb-24">
        <div className="grid grid-cols-1 gap-12 px-4 py-24 md:grid-cols-5 md:py-32">
          <div className="flex flex-col items-center justify-evenly gap-4 md:col-span-3 md:items-start md:pr-12">
            <div className="text-center text-4xl font-bold md:text-left md:text-5xl lg:text-6xl">
              <h1 className="mb-2 bg-gradient-to-r from-black to-gray-500 bg-clip-text py-1 text-transparent dark:from-blue-300 dark:to-blue-500">
                HeroTelInput
              </h1>
              A modern, accessible, and feature-rich international telephone
              input component.
            </div>
            <p className="subtitle mt- w-fit md:w-auto">
              <Link className={styles.cta} href="/docs">
                Get started <span>→</span>
              </Link>
            </p>
          </div>
          <div
            className={`${styles.right_layout} order-first hidden flex-col md:order-none md:col-span-2 md:block`}
          >
            <div className={`${styles.image_bg} hidden dark:block`} />
            <h1 className="text-center text-2xl font-bold">Hero tel input</h1>
            <Card className="mt-4 w-full">
              <HeroTelInput
                size="lg"
                defaultCountry="CN"
                preferredCountries={['CN']}
                forceCallingCode
              />
            </Card>
          </div>
        </div>
        <div className="px-4">
          <Features>
            {features.map((feature, index) => (
              <Feature
                key={index}
                index={index}
                id="highlighting-card"
                className="space-y-4"
              >
                <div className="flex size-10 items-center justify-center rounded-sm bg-transparent dark:bg-slate-500/10">
                  <Icon icon={feature.icon} className="size-6 text-white" />
                </div>
                <h4 className="flex items-center gap-2 text-xl font-bold">
                  {feature.title}
                </h4>
                <p className="text-md text-gray-500">{feature.description}</p>
              </Feature>
            ))}
          </Features>
        </div>
      </div>
    </HeroUIProvider>
  );
};
