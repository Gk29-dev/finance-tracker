import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectRoute = ({ element, ...rest }) => {
  const jwtToken = localStorage.getItem('user_jwt_token');

  return jwtToken ? <Navigate to="/" /> : element;
};

export default RedirectRoute;
