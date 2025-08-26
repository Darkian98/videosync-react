import type { RouteObject } from 'react-router';
import { lazy } from 'react';
import { Navigate } from 'react-router';

import { syncRoutes } from './sync';
import { dashboardRoutes } from '../../backOffice/routes/sections/dashboard';
import { authRoutes } from '../../backOffice/routes/sections/auth';

const Page404 = lazy(() => import('src/pages/error/404'));

export const routesSection: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="sync" replace />,
  },
  ...dashboardRoutes,
  ...syncRoutes,
  ...authRoutes,
  { path: '*', element: <Page404 /> },
];