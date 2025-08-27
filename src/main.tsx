import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Outlet, Navigate, useParams, RouterProvider, createBrowserRouter } from 'react-router';

import App from './app';
import { routesSection } from './routes/sections';
import i18n from './i18n/config';
import { I18nextProvider } from 'react-i18next';
import { supportedLanguages } from './config/supportedLanguages';

import 'dayjs/locale/es';
import 'dayjs/locale/de';

import 'dayjs/locale/fr';
import 'dayjs/locale/it';
import 'dayjs/locale/nl';
import 'dayjs/locale/pt';
import { ErrorBoundary } from './pages/error/error-boundary';

function LanguageLayout() {
  const { lng } = useParams();

  if (!lng || !supportedLanguages.includes(lng)) {
    return <Navigate to="/es/sync" replace />;
  }

  return (
    <App>
      <Outlet />
    </App>
  );
}

if (window.location.pathname === '/') {
  const browserLang = navigator.language.split('-')[0];
  const lang = supportedLanguages.includes(browserLang) ? browserLang : 'en';
  window.location.replace(`/${lang}/sync`);
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/en/sync" replace />
  },
  {
    path: '/:lng',
    Component: LanguageLayout,
    errorElement: <ErrorBoundary />,
    children: routesSection,
  },
]);

const root = createRoot(document.getElementById('root')!);

root.render(
  // <StrictMode>
  <HelmetProvider>
    <I18nextProvider i18n={i18n} >
      <RouterProvider router={router} />
    </I18nextProvider>
  </HelmetProvider>
  // </StrictMode>
);
