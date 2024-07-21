import React from 'react';
import { isAuthenticated } from './AuthService';
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = isAuthenticated();
  // console.log("user",user)
    return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;