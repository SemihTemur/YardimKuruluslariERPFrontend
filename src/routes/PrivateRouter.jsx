import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress, Box } from "@mui/material";

const PrivateRouter = () => {
  // giriş yapmış mı yapmamış mı onu kontrol edıyorum.
  const { user } = useSelector((state) => state.auth);

  // 2. Kontrol bitti ve kullanıcı yoksa giriş sayfasına yönlendir
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 3. Kullanıcı varsa korunan sayfayı göster
  return <Outlet />;
};

export default PrivateRouter;
