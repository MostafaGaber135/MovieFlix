import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!user) {
      toast.error('You must be logged in to access this page');
    }
  }, [user]);

  return user ? children : <Navigate to="/login" replace />;
}
