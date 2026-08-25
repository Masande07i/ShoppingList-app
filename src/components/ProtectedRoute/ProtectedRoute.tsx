import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../Store/Store"

export const ProtectedRoute = () => {
  const user = useSelector((state: RootState) => state.login.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};