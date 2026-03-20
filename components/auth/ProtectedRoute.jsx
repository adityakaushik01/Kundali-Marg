// components/auth/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AuthLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-teal-900">
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-12 h-12 rounded-full border-2 animate-spin"
        style={{ borderColor:"rgba(245,158,11,0.3)", borderTopColor:"#f59e0b" }}
      />
      <p className="text-sm font-light tracking-widest uppercase text-white/40">
        Checking session...
      </p>
    </div>
  </div>
);

const ProtectedRoute = ({ role }) => {
  const { isAuthenticated, isLoading, role: userRole } = useAuth();
  const location = useLocation();

  if (isLoading) return <AuthLoading />;

 if (!isAuthenticated) {
  return <Navigate to="/login" replace />;
}

  if (role && userRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;