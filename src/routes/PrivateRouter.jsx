import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouter = () => {
  // giriş yapmış mı yapmamış mı onu kontrol edıyorum.
  const { user, isAuthChecked } = useSelector((state) => state.auth);

  if (!isAuthChecked) {
    return null;
  }
  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PrivateRouter;
