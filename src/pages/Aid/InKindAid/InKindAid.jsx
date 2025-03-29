import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../../hooks/useGlobalState.js";
import useApi from "../../../hooks/useApi .js";
import Button from "@mui/material/Button";
import { Skeleton, Box } from "@mui/material";
import { toast, Toaster } from "react-hot-toast";
import { inKindAidInitialValues } from "../../../formik&yup/initalValues.js";
import { inKindAidYup } from "../../../formik&yup/yup.js";
import FormDialog from "../../../components/Dialog/FormScreenDialog/FormDialog.jsx";
import DeleteScreenDialog from "../../../components/Dialog/DeleteScreenDialog/DeleteScreenDialog.jsx";
import Table from "../../../components/UI/Table/Table.jsx";
import InKindAidForm from "../../../components/Form/InKindAidForm.jsx";

const InKindAid = () => {
  const { makeRequest } = useApi();

  const tableTitle = "Ayni Yardım Listesi";

  const [buttonTitle, setButtonTitle] = useState("");

  const {
    data,
    setData,
    loading,
    setLoading,
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
  } = useGlobalState("Ayni Yardım", inKindAidInitialValues, setButtonTitle);

  const columns = [
    {
      field: "familyName",
      headerName: "Aile Adı",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "itemName",
      headerName: "Ürün",
      width: 150,
      disableColumnMenu: true,
      renderCell: (params) => {
        return <div>{params.row?.category?.itemName || "Ürün Bulunamadı"}</div>;
      },
    },
    {
      field: "unit",
      headerName: "Birim",
      width: 150,
      disableColumnMenu: true,
      renderCell: (params) => {
        return <div>{params.row?.category?.unit || "Birim Bulunamadı"}</div>;
      },
    },
    {
      field: "quantity",
      headerName: "Miktar",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "duration",
      headerName: "Süre",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "period",
      headerName: "Dönem",
      width: 150,
      disableColumnMenu: true,
    },

    {
      field: "totalDistributedQuantity",
      headerName: "Toplam Bağış Miktarı",
      width: 150,
      disableColumnMenu: true,
    },

    {
      field: "startingDate",
      headerName: "Yardım Başlama Tarihi",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "endingDate",
      headerName: "Yardım Bitiş Tarihi",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "createdDate",
      headerName: "Kayıt Tarihi",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "modifiedDate",
      headerName: "Güncellenme Tarihi",
      width: 150,
      disableColumnMenu: true,
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
                onClick={() => openDeleteDialog(params.row.id)}
              >
                Sil
              </Button>
              <Button
                variant="contained"
                onClick={() => openUpdateScreen(params.row, params.row.id)}
              >
                Güncelle
              </Button>
            </div>
          ),
          width: 200,
        }
      : {},
  ];

  const updatedData = () => {
    return data.filter((item) => item.id !== selectedId);
  };

  // list
  const getInKindAidList = async () => {
    try {
      const inKindAidData = await makeRequest("get", "getInKindAidList");
      if (inKindAidData) {
        setData(inKindAidData);
        setLoading(true);
      }
    } catch (error) {
      console.error("Bağış verileri alınırken hata oluştu:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getInKindAidList();
  }, []);

  // Save
  const saveİnKindAid = async (values, { resetForm }) => {
    try {
      await makeRequest("post", "saveInKindAid", values);

      await getInKindAidList();

      toast.success("Bağış başarıyla kaydedildi!");
      resetForm();
      onCloseScreenDelay();
      console.log(values);
    } catch (error) {
      toast.error(
        "Bağış kaydedilemedi! Lütfen tekrar deneyin veya destek ekibiyle iletişime geçin."
      );
      console.log(error);
    }
  };

  // Update
  const updateInKindAidById = async (values) => {
    try {
      await makeRequest("put", "updateInKindAidById", values, selectedId);
      await getInKindAidList();
      toast.success("Bağış başarıyla güncellendi!");
      onCloseScreenDelay();
    } catch (error) {
      toast.error(
        "Bağış güncellenemedi! Lütfen tekrar deneyin veya destek ekibiyle iletişime geçin."
      );
    }
    setIsUpdatedOpen(false);
  };

  // Deletes
  const deleteInKindAidById = async () => {
    try {
      await makeRequest("delete", "deleteInKindAidById", null, selectedId);
      setData(updatedData(null, "delete"));
      toast.success("Bağış başarıyla silindi!");
    } catch (error) {
      toast.error("Bağış silinemedi! Lütfen tekrar deneyin.");
    }
    setIsDeletedOpen(false);
  };

  const deleteInKindAids = async () => {
    try {
      for (const row of selectedRows) {
        await makeRequest("delete", "deleteInKindAidById", null, row);
      }
      toast.success("Silindi!");
    } catch (error) {
      toast.error("Silinemedi.");
    }
    // Silme işleminden sonra veriyi güncelle
    const updatedData = data.filter(
      (item) => !selectedRows.some((row) => row === item.id)
    );
    setData(updatedData);
    setSelectedRows([]); // Seçimi sıfırla
    setIsDeletedOpen(false);
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
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            openDeleteDialog={openDeleteDialog}
            openAddScreen={openAddScreen}
            process={process}
          />

          {(isUpdatedOpen || isAddOpen) && (
            <FormDialog
              Component={InKindAidForm}
              title={screenTitle}
              buttonTitle={buttonTitle}
              isOpen={isUpdatedOpen || isAddOpen}
              onClose={onCloseScreen}
              onSubmit={isAddOpen ? saveİnKindAid : updateInKindAidById}
              initialValues={selectedData}
              validationSchema={inKindAidYup}
              process={process}
            />
          )}

          {isDeletedOpen && (
            <DeleteScreenDialog
              openDeleteDialog={openDeleteDialog}
              closeDeleteDialog={closeDeleteDialog}
              deleteCashDonationById={
                selectedRows.length > 1 ? deleteInKindAids : deleteInKindAidById
              }
            />
          )}
          <Toaster position="top-center" reverseOrder={false} />
        </>
      )}
    </div>
  );
};

export default InKindAid;
