import { Route, Routes } from "react-router-dom";

import authRoutes from "../auth.routes";

const AuthLayout: React.FC = () => {
    return <Routes>
        {authRoutes.map((route) => (
            <Route path={route.path} Component={route.Component} key={route.path} />
        ))}
    </Routes>;
}

export default AuthLayout;
