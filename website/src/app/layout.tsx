import type { FC, ReactNode } from 'react';
import type { Metadata } from 'next';
import { Banner, Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import cn from 'clsx';
import { Logo } from '@/components/Icons/Logo';
import '@/styles/globals.css';

export const metadata: Metadata = {
  description:
    'Hyperse HeroTelInput is a powerful international telephone input component for React. It is built on Hyperse HeroUI for efficient message processing.',
  metadataBase: new URL('https://www.hyperse.net/'),
  keywords: [
    'Hyperse',
    'HeroTelInput',
    'React',
    'HeroUI',
    'TypeScript',
    'JavaScript',
  ],
  generator: 'Hyperse',
  applicationName: 'Hyperse HeroTelInput',
  appleWebApp: {
    title: 'Hyperse HeroTelInput',
  },
  title: {
    default: 'Hyperse HeroTelInput – Hyperse HeroTelInput',
    template: '%s | Hyperse HeroTelInput',
  },
  openGraph: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    url: './',
    siteName: 'Hyperse HeroTelInput',
    locale: 'en_US',
    type: 'website',
  },
  other: {
    'msapplication-TileColor': '#fff',
  },
  twitter: {
    site: 'https://www.hyperse.net/',
  },
  alternates: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    canonical: './',
  },
};

const banner = (
  <Banner dismissible={false}>
    🎉 Hyperse HeroTelInput has been published.
  </Banner>
);
const navbar = (
  <Navbar
    logo={
      <div className="flex items-center gap-2">
        <Logo
          height="20"
          className={cn(
            'hover:transition-all hover:duration-1000 motion-reduce:hover:transition-none',
            '[mask-image:linear-gradient(60deg,#000_25%,rgba(0,0,0,.2)_50%,#000_75%)] [mask-size:400%] [mask-position:0]',
            'hover:[mask-position:100%]'
          )}
        />
        <span className="font-extralight">Hero Tel Input</span>
      </div>
    }
    projectLink="https://github.com/hyperse-io/hero-tel-input"
  />
);
const footer = (
  <Footer className="flex-col items-center md:items-start">
    <a
      className="x:focus-visible:nextra-focus flex items-center gap-1"
      target="_blank"
      rel="noreferrer"
      title="Hyperse on GitHub"
      href="https://github.com/hyperse-io"
    >
      Powered by Hyperse
    </a>
    <p className="mt-6 text-xs">
      {`© ${new Date().getFullYear()}`} Hyperse Inc. All rights reserved.
    </p>
  </Footer>
);

const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  const pageMap = await getPageMap();

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link
          rel="icon"
          href="/logger/favicon.svg"
          type="image/png"
          sizes="32x32"
        />
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/hyperse-io/hero-tel-input/tree/main/website"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
