import { Route, Routes } from "react-router-dom";

import borrowingsRoutes from "../borrowings.routes";

const BorrowingsLayout: React.FC = () => {
    return <Routes>
        {borrowingsRoutes.map((route) => (
            <Route path={route.path} Component={route.Component} key={route.path} />
        ))}
    </Routes>;
}

export default BorrowingsLayout;
