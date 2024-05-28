import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const ListBooks = lazy(() => import("./pages/ListBooks"));

const booksRoutes: RouteObject[] = [
    { path: '', Component: ListBooks },
];

export default booksRoutes;
