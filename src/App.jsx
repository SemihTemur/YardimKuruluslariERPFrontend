import React, { useState } from "react";
import "./styles/app.css";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Header from "./components/Header/Header.jsx";
import { RouterConfig } from "./routes/RouterConfig";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/" || location.pathname === "/forgot-password";

  return (
    <>
      {!isAuthPage ? (
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
