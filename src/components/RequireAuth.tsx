// Minimal RequireAuth for routing protection
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const isAuthenticated = true; // Mock for demo
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;

