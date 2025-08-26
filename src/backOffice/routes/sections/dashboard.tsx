import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { CONFIG } from 'src/backOffice/config/global-config';
import { DashboardLayout } from 'src/backOffice/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { usePathname } from '../../../hooks';
import { AuthGuard } from 'src/backOffice/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/backOffice/pages/dashboard/one'));
const PageTwo = lazy(() => import('src/backOffice/pages/dashboard/two'));
const PageThree = lazy(() => import('src/backOffice/pages/dashboard/three'));
const PageFour = lazy(() => import('src/backOffice/pages/dashboard/four'));
const PageFive = lazy(() => import('src/backOffice/pages/dashboard/five'));
const PageSix = lazy(() => import('src/backOffice/pages/dashboard/six'));

// ----------------------------------------------------------------------

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense key={pathname} fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}

const dashboardLayout = () => (
  <DashboardLayout>
    <SuspenseOutlet />
  </DashboardLayout>
);

export const dashboardRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? dashboardLayout() : <AuthGuard>{dashboardLayout()}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'two', element: <PageTwo /> },
      { path: 'three', element: <PageThree /> },
      {
        path: 'group',
        children: [
          { element: <PageFour />, index: true },
          { path: 'five', element: <PageFive /> },
          { path: 'six', element: <PageSix /> },
        ],
      },
    ],
  },
];
