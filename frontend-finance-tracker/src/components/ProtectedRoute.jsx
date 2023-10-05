import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const jwtToken = localStorage.getItem('user_jwt_token');

  return jwtToken ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
