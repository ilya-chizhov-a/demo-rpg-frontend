import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import { AppLayout } from './app/layouts/AppLayout/AppLayout';
import { ChakraAppProvider } from './app/providers/ChakraAppProvider';
import { container } from './shared/lib';
import 'src/shared/model/EnvironmentService';
import 'src/shared/model/ApiService';
import {
  defaultLocale,
  localeStorageKey,
  LocaleService,
  supportedLocaleValues,
} from './shared/model';

interface LayoutProps {
  readonly children: React.ReactNode;
}

const localeHydrationStyle = `
html[data-persisted-locale] {
  background: #0b1118;
}

html[data-persisted-locale]:not([data-locale-ready="true"]) body {
  background: #0b1118;
  visibility: hidden;
}
`;
const localeHydrationDefaultLocale = JSON.stringify(defaultLocale);
const localeHydrationStorageKey = JSON.stringify(localeStorageKey);
const localeHydrationSupportedLocales = JSON.stringify(supportedLocaleValues);
const localeHydrationScript = `
(function () {
  var root = document.documentElement;
  var markReady = function () {
    root.dataset.localeReady = 'true';
  };
  var shouldWaitForHydration = false;

  try {
    var defaultLocale = ${localeHydrationDefaultLocale};
    var supportedLocales = ${localeHydrationSupportedLocales};
    var locale = window.localStorage.getItem(${localeHydrationStorageKey});
    if (supportedLocales.indexOf(locale) !== -1) {
      root.lang = locale;
      if (locale === defaultLocale) {
        delete root.dataset.persistedLocale;
      } else {
        root.dataset.persistedLocale = locale;
        shouldWaitForHydration = true;
      }
    }
  } catch (error) {
    // Keep the server-rendered fallback visible when storage is unavailable.
  }

  if (shouldWaitForHydration) {
    window.setTimeout(markReady, 2000);
  } else {
    markReady();
  }
})();
`;

export function Layout({ children }: LayoutProps) {
  const locale = container.get(LocaleService).locale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Branching Tales — Demo RPG</title>
        <style dangerouslySetInnerHTML={{ __html: localeHydrationStyle }} />
        <script dangerouslySetInnerHTML={{ __html: localeHydrationScript }} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <ChakraAppProvider>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </ChakraAppProvider>
  );
}
