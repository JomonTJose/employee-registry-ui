import { useLocation, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequireAuth = ({ children }: any) => {
  const { auth }: any = useAuth();
  console.log(auth);
  const location = useLocation();

  return auth?.user ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
export default RequireAuth;
