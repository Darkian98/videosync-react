import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { SplashScreen } from 'src/components/loading-screen';

import { GuestGuard } from 'src/backOffice/auth/guard';
import { AuthSplitLayout } from 'src/backOffice/layouts/auth-split';

// ----------------------------------------------------------------------

/** **************************************
 * Jwt
 *************************************** */
const Jwt = {
  SignInPage: lazy(() => import('src/backOffice/pages/auth/jwt/sign-in')),
  // SignUpPage: lazy(() => import('src/pages/auth/jwt/sign-up')),
};

const authJwt = {
  path: 'jwt',
  children: [
    {
      path: 'sign-in',
      element: (
        <GuestGuard>
          <AuthSplitLayout
            slotProps={{
              section: { title: 'Bienvenido' },
            }}
          >
            <Jwt.SignInPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    // {
    //   path: 'sign-up',
    //   element: (
    //     <GuestGuard>
    //       <AuthSplitLayout>
    //         <Jwt.SignUpPage />
    //       </AuthSplitLayout>
    //     </GuestGuard>
    //   ),
    // },
  ],
};


// ----------------------------------------------------------------------

export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [authJwt],
  },
];
