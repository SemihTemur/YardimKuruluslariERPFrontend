import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Skeleton, Box } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa";
import useApi from "../../../hooks/useApi .js";
import "../../../styles/table-global.css";
import * as XLSX from "xlsx";
import { useSpecificState } from "../../../hooks/useSpecificState.js";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const CashDonationIncome = () => {
  const { makeRequest } = useApi();

  const {
    data,
    setData,
    loading,
    setLoading,
    filteredRows,
    setFilteredRows,
    searchText,
    tableTitle,
    handleSearch,
  } = useSpecificState("Nakdi Gelirler Listesi");

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
      headerName: "Bağışlanan miktar",
      width: 350,
      disableColumnMenu: true,
    },
  ];

  const getCashDonationIncomeList = async () => {
    try {
      const response = await makeRequest("get", "getCashDonationList");
      setLoading(true);
      setData(response.data);
    } catch (error) {
      toast.error(
        "Envanter verileri alınırken hata oluştu:",
        error.response.data.data
      );
    }
  };

  useEffect(() => {
    getCashDonationIncomeList();
  }, []);

  useEffect(() => {
    let totalDonated = 0;

    if (data) {
      let result = Object.values(
        data.reduce((acc, curr) => {
          const key = `${curr.donorFirstName} ${curr.donorLastName}`;
          totalDonated += curr.amount;
          if (!acc[key]) {
            acc[key] = { ...curr };
          } else {
            acc[key].amount += curr.amount;
          }
          return acc;
        }, {})
      );

      let totalDonation = {
        amount: `Toplam bağışlanan miktar: ${totalDonated}`,
        baseResponse: {
          id: "TOTAL_DONATION_ROW",
          createdDate: new Date().toISOString().split("T")[0],
          modifiedDate: new Date().toISOString().split("T")[0],
        },
        donorFirstName: "",
        donorLastName: "",
        currency: "TRY",
      };

      // Eğer son eleman zaten TOTAL_DONATION_ROW ise, ekleme
      if (
        result[result.length - 1]?.baseResponse?.id !== "TOTAL_DONATION_ROW"
      ) {
        result.push(totalDonation);
      }

      setFilteredRows(result);
    }
  }, [data]);

  const exportToExcel = () => {
    const filteredRowsWithoutOperations = filteredRows.map((row) => {
      const { actions, ...rest } = row;
      return rest;
    });

    const columnsWithoutOperations = columns.filter(
      (col) => col.field && col.field !== "actions"
    );

    const dataForExcel = filteredRowsWithoutOperations.map((row) => {
      return columnsWithoutOperations.map((col) => {
        switch (col.field) {
          default:
            return row[col.field] || "";
        }
      });
    });

    const excelData = [
      columnsWithoutOperations.map((col) => col.headerName),
      ...dataForExcel,
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tablo Verileri");
    XLSX.writeFile(workbook, "Nakdi Gelirler Listesi.xlsx");
  };

  const exportToPDF = async () => {
    // Yatay modda A4 boyutu (daha fazla alan sağlar)
    const doc = new jsPDF("l", "pt", "a4");

    try {
      // Font yükleme
      const response = await fetch("/fonts/times-base64.txt");
      if (!response.ok)
        throw new Error("Font dosyası bulunamadı veya yüklenemedi.");
      const timesFontBase64 = await response.text();

      doc.addFileToVFS("TimesNewRoman.ttf", timesFontBase64);
      doc.addFont("TimesNewRoman.ttf", "TimesNewRoman", "normal");
      doc.setFont("TimesNewRoman");

      // Başlık (daha büyük ve ortalanmış)
      doc.setFontSize(14);
      doc.text("Nakdi Gelirler Listesi", doc.internal.pageSize.width / 2, 25, {
        align: "center",
      });

      // Veri hazırlama
      const dataForPDF = filteredRows.map((row) => {
        return columns
          .filter((col) => col.field !== "actions")
          .map((col) => {
            switch (col.field) {
              default:
                return row[col.field] || "";
            }
          });
      });

      // Türkçe karakterleri normalize etme
      const normalizeHeader = (text) =>
        text
          .replace(/ğ/g, "g")
          .replace(/Ğ/g, "G")
          .replace(/ü/g, "u")
          .replace(/Ü/g, "U")
          .replace(/ş/g, "s")
          .replace(/Ş/g, "S")
          .replace(/ı/g, "i")
          .replace(/İ/g, "I")
          .replace(/ç/g, "c")
          .replace(/Ç/g, "C")
          .replace(/ö/g, "o")
          .replace(/Ö/g, "O");

      // Sütun başlıkları
      const tableColumn = columns
        .filter((col) => col.field !== "actions")
        .map((col) => normalizeHeader(col.headerName));

      const columnStyles = {
        0: { cellWidth: 270 },
        1: { cellWidth: 270 },
        2: { cellWidth: 270 },
      };

      // Tablo oluşturma
      autoTable(doc, {
        head: [tableColumn],
        body: dataForPDF,
        startY: 40,
        styles: {
          font: "TimesNewRoman",
          fontSize: 10, // Daha büyük font
          cellPadding: 4, // Daha fazla padding
          cellWidth: "wrap",
          overflow: "linebreak",
          minCellHeight: 12, // Daha büyük satır yüksekliği
          lineColor: [0, 0, 0], // Siyah çizgiler
          lineWidth: 0.5, // Orta kalınlıkta çizgiler
        },
        headStyles: {
          fillColor: [70, 130, 120], // Koyu başlık rengi
          textColor: 255,
          fontStyle: "bold",
          fontSize: 11, // Başlık fontu
          cellPadding: 5,
          halign: "center", // Başlık hücrelerini ortala
        },
        bodyStyles: {
          halign: "center", // Tüm hücre içeriklerini ortala
          valign: "middle",
        },
        columnStyles: columnStyles,
        margin: { horizontal: 10 },
        pageBreak: "auto",
        tableWidth: "auto",
        showHead: "everyPage",
        didDrawPage: function (data) {
          // Sayfa numarası
          doc.setFontSize(10);
          doc.text(
            `Sayfa ${data.pageNumber}`,
            doc.internal.pageSize.width - 30,
            doc.internal.pageSize.height - 15
          );
        },
      });

      doc.save("Nakdi Gelirler_Listesi.pdf");
    } catch (error) {
      console.error("PDF oluşturulurken hata:", error);
      alert("PDF oluşturulurken bir hata oluştu:\n" + error.message);
    }
  };

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
                getRowId={(row) => row.baseResponse.id}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 15, 20]}
                exportToExcel={exportToExcel}
                exportToPDF={exportToPDF}
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
