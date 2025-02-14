import React from "react";
import "./styles/app.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header.jsx";
import { RouterConfig } from "./routes/RouterConfig";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="container">
      <Sidebar />
      <Box className="box">
        <Header />
        <RouterConfig />
      </Box>
    </div>
  );
}

export default App;
