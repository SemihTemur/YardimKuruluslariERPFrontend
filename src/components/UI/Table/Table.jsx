import React from "react";
import MuiTable from "@mui/material/Table";
import { TableContainer } from "@mui/material";
import { Paper } from "@mui/material";
import "./table-global.css";

const Table = ({ children }) => {
  return (
    <TableContainer className="table__container" component={Paper}>
      <MuiTable className="table">{children}</MuiTable>
    </TableContainer>
  );
};

export default Table;
