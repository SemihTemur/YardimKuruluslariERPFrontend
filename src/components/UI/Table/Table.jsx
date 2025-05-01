import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Toaster } from "react-hot-toast";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa";
import "../../../styles/table-global.css";

const Table = ({
  title,
  searchText,
  handleSearch,
  filteredRows,
  columns,
  paginationModel,
  exportToExcel,
  exportToPDF,
  selectedRows,
  setSelectedRows,
  openDeleteDialog,
  openAddScreen,
}) => {
  return (
    <Box className="table-container">
      <Box className="add-container">
        <Button className="add-button" onClick={openAddScreen}>
          Ekle <AddIcon id="add-icon" />
        </Button>
      </Box>
      <Box className="table-container__paper-container">
        <Paper className="paper" elevation={3}>
          <Box className="paper-header">
            <Box className="paper-title">
              <h1 style={{ color: "white" }}>{title}</h1>
            </Box>
            <Box className="paper-actions">
              <Box className="paper-export__container">
                <Tooltip title="Excel" placement="top">
                  <RiFileExcel2Fill id="excel" onClick={exportToExcel} />
                </Tooltip>
                <Tooltip title="Pdf" placement="top">
                  <FaFilePdf id="pdf" onClick={exportToPDF} />
                </Tooltip>
              </Box>
              <Box className="paper-actions__search">
                <SearchIcon className="search" />
                <input
                  className="paper-input"
                  type="text"
                  placeholder="Ara"
                  value={searchText}
                  onChange={handleSearch}
                />
              </Box>
              {selectedRows.length > 1 && (
                <Tooltip title="Sil">
                  <IconButton>
                    <DeleteIcon className="delete" onClick={openDeleteDialog} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>

          <DataGrid
            className="data-grid"
            rows={filteredRows}
            columns={columns}
            getRowId={(row) => row.baseResponse.id}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 15, 20]}
            checkboxSelection
            disableColumnResize
            disableColumnFilter
            disableRowSelectionOnClick // Satıra tıklayınca seçilmesini engeller
            onRowSelectionModelChange={(newSelection) =>
              setSelectedRows(newSelection)
            }
            rowSelectionModel={selectedRows}
            localeText={{
              columnMenuHideColumn: "Sütunu Gizle",
              columnMenuManageColumns: "Sütunları Yönet",
              MuiTablePagination: {
                labelRowsPerPage: "Sayfa başına satır:",
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from}-${to} / ${count !== -1 ? count : `çok`} kayıt`,
              },
              footerRowSelected: (count) => `${count} satır seçildi`,
            }}
            columnMenu={false}
          />
        </Paper>
      </Box>
      <Toaster position="top-center" reverseOrder={false} />
    </Box>
  );
};

export default Table;
