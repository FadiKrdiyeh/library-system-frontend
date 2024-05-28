import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const ListBorrowings = lazy(() => import("./pages/ListBorrowings"));

const borrowingsRoutes: RouteObject[] = [
    { path: '', Component: ListBorrowings },
];

export default borrowingsRoutes;
