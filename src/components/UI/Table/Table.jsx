import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "../../../styles/table-global.css";

const Table = ({
  title,
  searchText,
  handleSearch,
  filteredRows,
  columns,
  paginationModel,
  selectedRows,
  setSelectedRows,
  openDeleteDialog,
  openAddScreen,
}) => {
  const exportToExcel = () => {
    // "İşlemler" sütununu kaldırmak için filteredRows'dan bu sütunu çıkarıyoruz
    const filteredRowsWithoutOperations = filteredRows.map((row) => {
      const { actions, ...rest } = row; // "actions" sütununu çıkarıyoruz
      return rest;
    });

    // "İşlemler" sütununu columns'dan çıkarıyoruz
    const columnsWithoutOperations = columns.filter(
      (col) => col.field !== "actions"
    );

    // Excel'e aktarılacak veriyi oluşturuyoruz
    const dataForExcel = filteredRowsWithoutOperations.map((row) => {
      // Sadece columnsWithoutOperations'daki sütunları alıyoruz
      return columnsWithoutOperations.map((col) => row[col.field] || "");
    });

    // Başlıkları ve verileri birleştiriyoruz
    const excelData = [
      columnsWithoutOperations.map((col) => col.headerName), // Başlıklar
      ...dataForExcel, // Veriler
    ];

    // Excel dosyasını oluşturuyoruz
    const worksheet = XLSX.utils.aoa_to_sheet(excelData); // Array of Arrays (aoa) kullanıyoruz
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tablo Verileri");

    // Excel dosyasını indiriyoruz
    XLSX.writeFile(workbook, `${title}.xlsx`);
  };

  const exportToPDF = async () => {
    const doc = new jsPDF();

    try {
      // ✅ Base64 font dosyasını HTTP üzerinden oku
      const response = await fetch("/fonts/times-base64.txt");
      if (!response.ok) {
        throw new Error("Font dosyası bulunamadı veya yüklenemedi.");
      }
      const timesFontBase64 = await response.text();

      // ✅ 1. Fontu jsPDF'in sanal dosya sistemine (VFS) ekle
      doc.addFileToVFS("TimesNewRoman.ttf", timesFontBase64);

      // ✅ 2. Fontu jsPDF'e tanıt
      doc.addFont("TimesNewRoman.ttf", "TimesNewRoman", "normal");

      // ✅ 3. Fontu kullan
      doc.setFont("TimesNewRoman");

      // Başlık ekleme
      doc.text(title, 15, 10);

      // "İşlemler" sütununu kaldır
      const filteredRowsWithoutOperations = filteredRows.map((row) => {
        const { actions, ...rest } = row;
        return rest;
      });

      const columnsWithoutOperations = columns.filter(
        (col) => col.field !== "actions"
      );

      // Tablo başlık ve satırlarını oluştur
      const tableColumn = columnsWithoutOperations.map((col) => col.headerName);
      const tableRows = filteredRowsWithoutOperations.map((row) =>
        columnsWithoutOperations.map((col) => row[col.field] || "")
      );

      // Tabloyu ekle
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        styles: { font: "TimesNewRoman" }, // Font stilini belirt
      });

      // PDF'i kaydet
      doc.save(`${title}.pdf`);
    } catch (error) {
      console.error("Font yüklenirken hata oluştu:", error);
    }
  };

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
    </Box>
  );
};

export default Table;
