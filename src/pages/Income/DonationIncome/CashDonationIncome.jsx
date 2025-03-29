import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Skeleton, Box } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import useApi from "../../../hooks/useApi .js";
import "../../../styles/table-global.css";

const CashDonationIncome = () => {
  const { makeRequest } = useApi();

  const [loading, setLoading] = useState(false);

  const [filteredRows, setFilteredRows] = useState(null);

  const [data, setData] = useState(null);

  const [searchText, setSearchText] = useState("");

  const tableTitle = "Nakdi Gelir Listesi";

  const paginationModel = { page: 0, pageSize: 5 };

  const columns = [
    {
      field: "donorFirstName",
      headerName: "Bağışçı Adı",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "donorLastName",
      headerName: "Bağışçı Soyadı",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "amount",
      headerName: "Tutar",
      width: 150,
      disableColumnMenu: true,
    },
  ];

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
    XLSX.writeFile(workbook, `${tableTitle}.xlsx`);
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
      doc.text(tableTitle, 15, 10);

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
      doc.save(`${tableTitle}.pdf`);
    } catch (error) {
      console.error("Font yüklenirken hata oluştu:", error);
    }
  };

  // Arama fonksiyonu
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filteredData = data.filter((row) =>
      Object.values(row).some(
        (field) => field && field.toString().toLowerCase().includes(value)
      )
    );

    setFilteredRows(filteredData);
  };

  const getCashDonationIncomeList = async () => {
    const cashDonationIncomeData = await makeRequest(
      "get",
      "getCashDonationList"
    );
    setData(cashDonationIncomeData);
    setLoading(true);
  };

  useEffect(() => {
    getCashDonationIncomeList();
  }, []);

  useEffect(() => {
    if (data) {
      const result = Object.values(
        data.reduce((acc, curr) => {
          let key = `${curr.donorFirstName} ${curr.donorLastName}`; // İsim-Soyisim bazlı anahtar oluştur

          if (!acc[key]) {
            acc[key] = { ...curr }; // Eğer daha önce eklenmemişse direkt ekle
          } else {
            acc[key].amount += curr.amount; // Eğer zaten varsa amount'u topla
          }

          return acc;
        }, {})
      );
      setFilteredRows(result); // Burada toplam bağışları güncelleriz
      console.log(result); // Konsola yazdır
    }
  }, [data]);

  return (
    <div className="main-container">
      {!loading ? (
        <Box className="loading_screen">
          <Skeleton
            sx={{
              backgroundColor: "#4a5d7a",
              width: "50vw",
              height: "40vh",
              border: "1px solid gray",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Box>
      ) : (
        <Box className="table-container">
          <Box className="table-container__paper-container">
            <Paper className="paper" elevation={3}>
              <Box className="paper-header">
                <Box className="paper-title">
                  <h1 style={{ color: "white", padding: "0px 10px 0px 10px" }}>
                    {tableTitle}
                  </h1>
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
                </Box>
              </Box>

              <DataGrid
                className="data-grid"
                rows={filteredRows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 15, 20]}
                disableColumnResize
                disableColumnFilter
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
      )}
    </div>
  );
};

export default CashDonationIncome;
