import React, { useEffect, useState } from "react";
import "./styles/app.css";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Header from "./components/Header/Header.jsx";
import { RouterConfig } from "./routes/RouterConfig";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, markAuthChecked } from "./redux/authSlice";

function App() {
  // const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/" || location.pathname === "/forgot-password";

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthPage) {
      dispatch(logoutUser());
    }
  }, [location.pathname]);

  return (
    <>
      {user ? (
        <div className="container">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          <Box className="box">
            <Header setCollapsed={setCollapsed} />
            <RouterConfig />
          </Box>
        </div>
      ) : (
        <RouterConfig />
      )}
    </>
  );
}

export default App;
