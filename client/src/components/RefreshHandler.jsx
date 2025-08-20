import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(true);

      // Redirect only if user is on login or signup
      if (['/login', '/signup'].includes(location.pathname)) {
        navigate('/dashboard', { replace: true });
      }
    } else {
      setIsAuthenticated(false);

      // If unauthenticated and trying to access protected routes
      if (!['/','/login', '/signup'].includes(location.pathname)) {
        navigate('/login', { replace: true });
      }
    }
  }, [location.pathname]); // ✅ React only when the path changes

  return null;
}

export default RefreshHandler;
