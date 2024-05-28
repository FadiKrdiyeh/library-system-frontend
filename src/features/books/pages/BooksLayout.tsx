import { Route, Routes } from "react-router-dom";

import booksRoutes from "../books.routes";

const BooksLayout: React.FC = () => {
    return <Routes>
        {booksRoutes.map((route) => (
            <Route path={route.path} Component={route.Component} key={route.path} />
        ))}
    </Routes>;
}

export default BooksLayout;
