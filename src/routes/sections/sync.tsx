import type { RouteObject } from 'react-router';
import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';
import { usePathname } from '../../hooks';
import LayoutSync from 'src/layouts/sync/client/layout';

const ClientPage = lazy(() => import('src/pages/sync/client'));
const HostPage = lazy(() => import('src/pages/sync/host'));

function SuspenseOutlet() {
    const pathname = usePathname();
    return (
        <Suspense key={pathname} fallback={<></>}>
            <Outlet />
        </Suspense>
    );
}


export const syncRoutes: RouteObject[] = [
    {
        path: 'sync',
        element: <><SuspenseOutlet /></>,
        children: [
            { element: <HostPage />, index: true },
            { path: 'client/:id', element: <ClientPage />, index: false },
        ],
    },
];
