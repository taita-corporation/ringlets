import * as React from 'react';
import { SkipNavContent, SkipNavLink } from './skip-nav';
import Header from './header';
import Footer from './footer';
import { Seo } from './seo';
import '@fontsource/playball';

export function Layout({ children }) {
  return (
    <div>
      <Seo />
      <SkipNavLink />
      <Header />
      <SkipNavContent>
        <div className="left-0 right-0 max-w-3xl mx-auto">
          {children}
        </div>
      </SkipNavContent>
      <Footer />
    </div>
  );
}
