// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Suspense, lazy, useEffect } from 'react';
import routes from './router';
import Header from './shared/layouts/Header';
import Loader from './shared/components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from './features/auth/authSlice';
import { AppState } from './store';
const AppSnackbar = lazy(() => import('./shared/components/AppSnackbar'))

const App = () => {
  const dispatch = useDispatch();
  const isAuth = !!useSelector((state: AppState) => state.auth.token?.token)

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user') || 'null');
    const tokenFromLocalStorage = localStorage.getItem('token');
    const expireInFromLocalStorage = localStorage.getItem('expireIn');

    if (!!userFromLocalStorage && !!tokenFromLocalStorage && !!expireInFromLocalStorage)
      dispatch(loginSuccess({ user: userFromLocalStorage, token: { token: tokenFromLocalStorage, expireIn: expireInFromLocalStorage } }));
  }, [dispatch])

  return (
    <Suspense fallback={<Loader fixed overlay styles={{ text: { color: '#fff' } }} />}>
      <div className="App">
        <Header />

        <Routes>
          {routes.map((route) => (
            <Route path={route.route.path} key={route.route.path} element={(route.needAuth && !isAuth) ? <Navigate to='/auth/login' replace /> : (((route.redirectToHomeIfAuth && isAuth) || route.route.path === '/') ? <Navigate to='/books' /> : route.route.element)} />
          ))}
        </Routes>
      </div>

      <AppSnackbar />
    </Suspense>
  );
}

export default App;
