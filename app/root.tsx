// app/root.tsx
import './app.css';

import Cookies from 'js-cookie';
import {
  isRouteErrorResponse,
  Links,
  type LinksFunction,
  type LoaderFunctionArgs,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from 'react-router';

import { getLanguageSession, getThemeSession } from './.server/services/session.service';
import type { Route } from './+types/root';
import { AppSidebar } from './components/layout/app-sidebar';
import { NavigationProgress } from './components/navigation-progress';
import SkipToMain from './components/skip-to-main';
import { SidebarProvider } from './components/ui/sidebar';
import { Toaster } from './components/ui/sonner';
import { SearchProvider } from './context/search-context';
import { LanguageProvider } from './hooks/use-language';
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from './hooks/use-theme';
import { cn } from './lib/utils';
import ForbiddenError from './routes/pages/errors/forbidden';
import GeneralError from './routes/pages/errors/general-error';
import MaintenanceError from './routes/pages/errors/maintenance-error';
import NotFoundError from './routes/pages/errors/not-found-error';
import UnauthorisedError from './routes/pages/errors/unauthorized-error';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const [{ getLanguage }, { getTheme }] = await Promise.all([
    getLanguageSession(request),
    getThemeSession(request),
  ]);

  return {
    lang: getLanguage(),
    ssrTheme: getTheme(),
  };
};

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export const App = ({ lang, ssrTheme }: Route.ComponentProps['loaderData']) => {
  const [theme] = useTheme();
  const location = useLocation();
  const defaultOpen = Cookies.get('sidebar_state') !== 'false';
  const isLogin = location.pathname === '/login';

  return (
    <html lang={lang} className={theme ?? ''}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(ssrTheme)} />
        <Links />
      </head>
      <body>
        <NavigationProgress />
        {isLogin ? (
          <Outlet />
        ) : (
          <SearchProvider>
            <SidebarProvider defaultOpen={defaultOpen}>
              <SkipToMain />
              <AppSidebar />
              <div id="content" className={cn('ml-auto w-full max-w-full')}>
                <Outlet />
              </div>
            </SidebarProvider>
          </SearchProvider>
        )}
        <Toaster duration={5000} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default function AppWithProviders({ loaderData }: Route.ComponentProps) {
  const { lang, ssrTheme } = loaderData;

  return (
    <LanguageProvider specifiedLanguage={lang} languageAction="/api/language">
      <ThemeProvider specifiedTheme={ssrTheme} themeAction="/api/theme">
        {/* <FontProvider specifiedFont={ssrFont} fontAction="/api/font"> */}
        <App {...loaderData} />
        {/* </FontProvider> */}
      </ThemeProvider>
    </LanguageProvider>
  );
}

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
  let errorComponent = <GeneralError minimal />;

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 401:
        errorComponent = <UnauthorisedError />;
        break;
      case 403:
        errorComponent = <ForbiddenError />;
        break;
      case 404:
        errorComponent = <NotFoundError />;
        break;
      case 503:
        errorComponent = <MaintenanceError />;
        break;
      case 500:
      default:
        errorComponent = <GeneralError />;
        break;
    }
  }

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div>{errorComponent}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};
