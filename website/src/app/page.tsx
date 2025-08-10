import type { FC } from 'react';
import type { Metadata } from 'next';
import { HeroUIProvider } from '@heroui/react';
import { HeroTelInput } from '@hyperse/hero-tel-input';
import './page.css';

export const metadata: Metadata = {
  description:
    'Build fast, customizable, and content-rich websites with Nextra. Powered by Next.js, it offers seamless Markdown support, customizable themes, file conventions, and easy integration with MDX, making it perfect for documentation, blogs, and static websites.',
};

const IndexPage: FC = () => {
  return (
    <HeroUIProvider>
      <div className="flex min-h-screen w-screen items-center justify-center">
        <HeroTelInput />
      </div>
    </HeroUIProvider>
  );
};

export default IndexPage;
