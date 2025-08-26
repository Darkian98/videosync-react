import type { RouteObject } from 'react-router';
import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';
import { usePathname } from '../../hooks';
import LayoutSync from 'src/layouts/sync/layout';

const IndexPage = lazy(() => import('src/pages/sync/sync'));

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
        element: <div><SuspenseOutlet /></div>,
        children: [
            { element: <IndexPage />, index: true },
        ],
    },
];
