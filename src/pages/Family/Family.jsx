import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../hooks/useGlobalState.js";
import useApi from "../../hooks/useApi .js";
import Button from "@mui/material/Button";
import { Skeleton, Box } from "@mui/material";
import { toast, Toaster } from "react-hot-toast";
import { familyInitialValues } from "../../formik&yup/initalValues.js";
import { familyYup } from "../../formik&yup/yup.js";
import FormDialog from "../../components/Dialog/FormScreenDialog/FormDialog.jsx";
import DeleteScreenDialog from "../../components/Dialog/DeleteScreenDialog/DeleteScreenDialog.jsx";
import Table from "../../components/UI/Table/Table.jsx";
import FamilyForm from "../../components/Form/FamilyForm.jsx";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const Family = () => {
  const { makeRequest } = useApi();

  const tableTitle = "Aileler Listesi";

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
    isPermission,
    user,
  } = useGlobalState("FAMILY", "Aile", familyInitialValues, setButtonTitle);

  const columns = [
    {
      field: "familyName",
      headerName: "Aile Adı",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "familyMemberCount",
      headerName: "Kişi Sayısı",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "phoneNumber",
      headerName: "Telefon Numarası",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      disableColumnMenu: true,
    },

    {
      field: "city",
      headerName: "İl",
      width: 150,
      disableColumnMenu: true,
      renderCell: (params) => {
        return <div>{params.row?.address?.city || "İl Yok"}</div>;
      },
    },

    {
      field: "district",
      headerName: "İlçe",
      width: 150,
      disableColumnMenu: true,
      renderCell: (params) => {
        return <div>{params.row?.address?.district || "İlçe Yok"}</div>;
      },
    },

    {
      field: "neighborhood",
      headerName: "Mahalle",
      width: 150,
      disableColumnMenu: true,
      renderCell: (params) => {
        return <div>{params.row?.address?.neighborhood || "Mahalle Yok"}</div>;
      },
    },

    {
      field: "street",
      headerName: "Sokak",
      width: 150,
      disableColumnMenu: true,
      renderCell: (params) => {
        return <div>{params.row?.address?.street || "Sokak Yok"}</div>;
      },
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
    if (user) {
      getFamilyList();
    }
  }, [user]);

  useEffect(() => {
    if (isPermission && isPermission != -1) {
      toast.error("Yetkiniz bulunmamaktadır!!!");
    }
  }, [isPermission]);

  const getFamilyList = async () => {
    try {
      const response = await makeRequest("get", "getFamilyList");
      setLoading(true);
      setData(response.data);
    } catch (error) {
      toast.error(
        "Aile verileri alınırken hata oluştu:",
        error.response.data.data
      );
    }
  };

  // Save
  const saveFamily = async (values, { resetForm }) => {
    try {
      const response = await makeRequest("post", "saveFamily", values);
      updatedDatas(response.data, "save");
      toast.success("Aile başarıyla kaydedildi!");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.data || "Bir hata oluştu.");
      } else {
        toast.error("Bağlantı hatası. Lütfen tekrar deneyin.");
      }
    }
    resetForm();
    onCloseScreenDelay();
  };

  // Update
  const updateFamilyById = async (values) => {
    try {
      const response = await makeRequest(
        "put",
        "updateFamilyById",
        values,
        selectedId
      );
      updatedDatas(response.data, "update");
      toast.success("Aile başarıyla güncellendi!");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.data || "Bir hata oluştu.");
      } else {
        toast.error("Bağlantı hatası. Lütfen tekrar deneyin.");
      }
    }
    onCloseScreenDelay();
    setIsUpdatedOpen(false);
  };

  // Deletes
  const deleteFamilyById = async () => {
    try {
      const response = await makeRequest(
        "delete",
        "deleteFamilyById",
        null,
        selectedId
      );

      updatedDatas(response.data, "delete");
      toast.success("Aile başarıyla silindi!");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.data || "Bir hata oluştu.");
      } else {
        toast.error("Bağlantı hatası. Lütfen tekrar deneyin.");
      }
    }
    setIsDeletedOpen(false);
  };

  const deleteSelectedFamilys = async () => {
    try {
      for (const row of selectedRows) {
        const response = await makeRequest(
          "delete",
          "deleteFamilyById",
          null,
          row
        );
        updatedDatas(response.data, "delete");
      }
      toast.success("Aileler başarıyla silindi!");
    } catch (error) {
      toast.error("Aileler silinemedi! Lütfen tekrar deneyin.");
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
          case "city":
            return row.address?.city || "";
          case "district":
            return row.address?.district || "";
          case "neighborhood":
            return row.address?.neighborhood || "";
          case "street":
            return row.address?.street || "";
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
    XLSX.writeFile(workbook, "Aileler Listesi.xlsx");
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
      doc.text("Aileler Listesi", doc.internal.pageSize.width / 2, 25, {
        align: "center",
      });

      // Veri hazırlama
      const dataForPDF = filteredRows.map((row) => {
        return columns
          .filter((col) => col.field !== "actions")
          .map((col) => {
            switch (col.field) {
              case "city":
                return row.address?.city || "";
              case "district":
                return row.address?.district || "";
              case "neighborhood":
                return row.address?.neighborhood || "";
              case "street":
                return row.address?.street || "";
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

      // Özel sütun genişlikleri (fotoğraftaki gibi düzen)
      const columnStyles = {
        0: { cellWidth: 80 },
        1: { cellWidth: 80 },
        2: { cellWidth: 80 },
        3: { cellWidth: 80 },
        4: { cellWidth: 80 },
        5: { cellWidth: 80 },
        6: { cellWidth: 80 },
        7: { cellWidth: 80 },
        8: { cellWidth: 80 },
        9: { cellWidth: 80 },
        10: { cellWidth: 80 },
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

      doc.save("Bağışçılar_Listesi.pdf");
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
              Component={FamilyForm}
              title={screenTitle}
              buttonTitle={buttonTitle}
              isOpen={isUpdatedOpen || isAddOpen}
              onClose={onCloseScreen}
              onSubmit={isAddOpen ? saveFamily : updateFamilyById}
              initialValues={selectedData}
              validationSchema={familyYup}
              process={process}
            />
          )}

          {isDeletedOpen && (
            <DeleteScreenDialog
              openDeleteDialog={openDeleteDialog}
              closeDeleteDialog={closeDeleteDialog}
              deleteCashDonationById={
                selectedRows.length > 1
                  ? deleteSelectedFamilys
                  : deleteFamilyById
              }
            />
          )}
        </>
      )}
    </div>
  );
};

export default Family;
