import React, { useState } from "react";
import "./styles/app.css";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Header from "./components/Header/Header.jsx";
import { RouterConfig } from "./routes/RouterConfig";
import { Box } from "@mui/material";

function App() {
  const [collapsed,setCollapsed] = useState(false)

  return (
    <div className="container">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Box className="box">
        <Header setCollapsed={setCollapsed} />
        <RouterConfig />
      </Box>
    </div>
  );
}

export default App;
