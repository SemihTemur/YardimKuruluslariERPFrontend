import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCashBalance } from "../../../redux/cashSlice";
import useApi from "../../../hooks/useApi .js";
import Button from "@mui/material/Button";
import { Skeleton, Box } from "@mui/material";
import { toast, Toaster } from "react-hot-toast";
import { cashDonationInitialValues } from "../../../formik&yup/initalValues.js";
import { cashDonationYup } from "../../../formik&yup/yup.js";
import "../../../styles/table-global.css";
import FormDialog from "../../../components/Dialog/FormScreenDialog/FormDialog.jsx";
import DeleteScreenDialog from "../../../components/Dialog/DeleteScreenDialog/DeleteScreenDialog.jsx";
import Table from "../../../components/UI/Table/Table.jsx";
import { useGlobalState } from "../../../hooks/useGlobalState.js";
import CashDonationForm from "../../../components/Form/CashDonationForm.jsx";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const CashDonation = () => {
  const { makeRequest } = useApi();
  const dispatch = useDispatch();

  const tableTitle = "Nakdi Bağış Yapanlar Listesi";

  const [buttonTitle, setButtonTitle] = useState("");

  const {
    data,
    setData,
    loading,
    setLoading,
    updatedDatas,
    selectedData,
    isAddOpen,
    isUpdatedOpen,
    setIsUpdatedOpen,
    isDeletedOpen,
    setIsDeletedOpen,
    filteredRows,
    selectedRows,
    setSelectedRows,
    selectedId,
    process,
    searchText,
    screenTitle,
    paginationModel,
    onCloseScreenDelay,
    openAddScreen,
    openUpdateScreen,
    onCloseScreen,
    openDeleteDialog,
    closeDeleteDialog,
    handleSearch,
  } = useGlobalState("Nakdi Bağış", cashDonationInitialValues, setButtonTitle);

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
    {
      field: "createdDate",
      headerName: "Kayıt Tarihi",
      width: 150,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <div>
            {params.row?.baseResponse?.createdDate || "Oluşturulma Tarihi Yok."}
          </div>
        );
      },
    },
    {
      field: "modifiedDate",
      headerName: "Güncellenme Tarihi",
      width: 150,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <div>
            {params.row?.baseResponse?.modifiedDate || "Güncelleme Tarihi Yok."}
          </div>
        );
      },
    },
    selectedRows.length < 2
      ? {
          headerName: "İşlemler",
          field: "actions",
          sortable: false,
          headerAlign: "center",
          renderCell: (params) => (
            <div className="button-container">
              <Button
                variant="contained"
                color="error"
                onClick={() => openDeleteDialog(params.row.baseResponse.id)}
              >
                Sil
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  openUpdateScreen(params.row, params.row.baseResponse.id)
                }
              >
                Güncelle
              </Button>
            </div>
          ),
          width: 200,
        }
      : {},
  ];

  useEffect(() => {
    getCashDonationList();
  }, []);

  // list
  const getCashDonationList = async () => {
    try {
      const response = await makeRequest("get", "getCashDonationList");
      setLoading(true);
      setData(response.data);
    } catch (error) {
      toast.error(
        "Nakdi bağış verileri alınırken hata oluştu:",
        error.response.data.data
      );
    }
  };

  // Save
  const saveCashDonation = async (values, { resetForm }) => {
    try {
      const response = await makeRequest("post", "saveCashDonation", values);
      updatedDatas(response.data, "save");
      toast.success("Nakdi bağış başarıyla kaydedildi!");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.data || "Bir hata oluştu.");
      } else {
        toast.error("Bağlantı hatası. Lütfen tekrar deneyin.");
      }
    }

    dispatch(getCashBalance());
    resetForm();
    onCloseScreenDelay();
  };

  // Update
  const updateCashDonationById = async (values) => {
    try {
      const response = await makeRequest(
        "put",
        "updateCashDonationById",
        values,
        selectedId
      );
      updatedDatas(response.data, "update");
      toast.success("Nakdi bağış başarıyla güncellendi!");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.data || "Bir hata oluştu.");
      } else {
        toast.error("Bağlantı hatası. Lütfen tekrar deneyin.");
      }
    }
    dispatch(getCashBalance());
    onCloseScreenDelay();
    setIsUpdatedOpen(false);
  };

  // Deletes
  const deleteCashDonationById = async () => {
    try {
      const response = await makeRequest(
        "delete",
        "deleteCashDonationById",
        null,
        selectedId
      );
      updatedDatas(response.data, "delete");
      toast.success("Nakdi bağış başarıyla silindi!");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.data || "Bir hata oluştu.");
      } else {
        toast.error("Bağlantı hatası. Lütfen tekrar deneyin.");
      }
    }
    setIsDeletedOpen(false);
    dispatch(getCashBalance());
  };

  const deleteSelectedCashDonations = async () => {
    try {
      for (const row of selectedRows) {
        const response = await makeRequest(
          "delete",
          "deleteCashDonationById",
          null,
          row
        );
        updatedDatas(response.data, "delete");
        dispatch(getCashBalance());
      }
      toast.success("Nakdi bağışlar başarıyla silindi!");
    } catch (error) {
      toast.error("Nakdi bağışlar silinemedi! Lütfen tekrar deneyin.");
    }

    setSelectedRows([]); // Seçimi sıfırla
    setIsDeletedOpen(false);
  };

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
          case "createdDate":
            return row.baseResponse?.createdDate || "";
          case "modifiedDate":
            return row.baseResponse?.modifiedDate || "";
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
    XLSX.writeFile(workbook, "Kategoriler Listesi.xlsx");
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
      doc.text(
        "Nakdi Bağış Yapanlar Listesi",
        doc.internal.pageSize.width / 2,
        25,
        {
          align: "center",
        }
      );

      // Veri hazırlama
      const dataForPDF = filteredRows.map((row) => {
        return columns
          .filter((col) => col.field !== "actions")
          .map((col) => {
            switch (col.field) {
              case "createdDate":
                return row.baseResponse?.createdDate
                  ? new Date(row.baseResponse.createdDate).toLocaleDateString()
                  : "";
              case "modifiedDate":
                return row.baseResponse?.modifiedDate
                  ? new Date(row.baseResponse.modifiedDate).toLocaleDateString()
                  : "";
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
        0: { cellWidth: 150 }, // ürün Adı
        1: { cellWidth: 150 }, // Birim Adı
        2: { cellWidth: 150 }, // Kayıt Tarihi
        3: { cellWidth: 150 }, // Güncelleme Tarihi
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

      doc.save("Nakdi Bağış Yapanlar_Listesi.pdf");
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
              width: "10vw",
              height: "10%",
              border: "1px solid gray",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
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
        <>
          <Table
            title={tableTitle}
            searchText={searchText}
            handleSearch={handleSearch}
            filteredRows={filteredRows}
            columns={columns}
            paginationModel={paginationModel}
            exportToExcel={exportToExcel}
            exportToPDF={exportToPDF}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            openDeleteDialog={openDeleteDialog}
            openAddScreen={openAddScreen}
            process={process}
          />

          {(isUpdatedOpen || isAddOpen) && (
            <FormDialog
              Component={CashDonationForm}
              title={screenTitle}
              buttonTitle={buttonTitle}
              isOpen={isUpdatedOpen || isAddOpen}
              onClose={onCloseScreen}
              onSubmit={isAddOpen ? saveCashDonation : updateCashDonationById}
              initialValues={selectedData}
              validationSchema={cashDonationYup}
              process={process}
            />
          )}

          {isDeletedOpen && (
            <DeleteScreenDialog
              openDeleteDialog={openDeleteDialog}
              closeDeleteDialog={closeDeleteDialog}
              deleteCashDonationById={
                selectedRows.length > 1
                  ? deleteSelectedCashDonations
                  : deleteCashDonationById
              }
            />
          )}
          <Toaster position="top-center" reverseOrder={false} />
        </>
      )}
    </div>
  );
};

export default CashDonation;
