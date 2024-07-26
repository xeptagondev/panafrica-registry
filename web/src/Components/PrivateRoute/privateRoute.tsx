import React from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { useUserContext } from '@undp/carbon-library';

const PrivateRoute = () => {
  const { IsAuthenticated } = useUserContext();
  const location = useLocation();
  const currentPage = location.pathname.replace(/^\/|\/$/g, '');
  return IsAuthenticated() ? (
    currentPage === '' || currentPage === undefined ? (
      <Navigate to="/dashboard" state={{ from: location }} replace />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
