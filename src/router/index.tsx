import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const AuthLayout = lazy(() => import('../features/auth/pages/AuthLayout'));
const BooksLayout = lazy(() => import('../features/books/pages/BooksLayout'));
const BorrowingsLayout = lazy(() => import('../features/borrowings/pages/BorrowingsLayout'));
const NotFound = lazy(() => import('../shared/pages/NotFound'));

type MyRouteObject = {
    route: RouteObject;
    needAuth?: boolean;
    redirectToHomeIfAuth?: boolean;
}

const routes: MyRouteObject[] = [
    { route: { path: '/' }, redirectToHomeIfAuth: true },
    { route: { path: '/auth/*', element: <AuthLayout /> }, redirectToHomeIfAuth: true },
    { route: { path: '/books/*', element: <BooksLayout /> } },
    { route: { path: '/borrowings/*', element: <BorrowingsLayout /> }, needAuth: true },
    { route: { path: '*', element: <NotFound /> } },
];

export default routes;
