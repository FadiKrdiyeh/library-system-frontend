import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

const authRoutes: RouteObject[] = [
    { path: '/login', Component: Login },
    { path: '/register', Component: Register },
];

export default authRoutes;
