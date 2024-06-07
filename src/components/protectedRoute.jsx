import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute component that protects routes from unauthenticated access
function ProtectedRoute({ children, user }) {
  // If user is authenticated, render the children components
  // If user is not authenticated, navigate to the home page
  return user ? children : <Navigate to='/' />;
}

export default ProtectedRoute;
