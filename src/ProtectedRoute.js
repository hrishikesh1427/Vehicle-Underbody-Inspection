import React, { useState, useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check user login status in localStorage
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    setIsAuthenticated(userLoggedIn === 'true');
  }, []);

  return isAuthenticated ? (
    <Route element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
