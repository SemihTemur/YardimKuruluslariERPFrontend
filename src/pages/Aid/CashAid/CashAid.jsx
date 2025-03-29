import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCashBalance } from "../../../redux/cashSlice";
import useApi from "../../../hooks/useApi .js";
import Button from "@mui/material/Button";
import { Skeleton, Box } from "@mui/material";
import { toast, Toaster } from "react-hot-toast";
import { cashAidInitialValues } from "../../../formik&yup/initalValues.js";
import { cashAidYup } from "../../../formik&yup/yup.js";
import "../../../styles/table-global.css";
import FormDialog from "../../../components/Dialog/FormScreenDialog/FormDialog.jsx";
import DeleteScreenDialog from "../../../components/Dialog/DeleteScreenDialog/DeleteScreenDialog.jsx";
import Table from "../../../components/UI/Table/Table.jsx";
import { useGlobalState } from "../../../hooks/useGlobalState.js";
import CashAidForm from "../../../components/Form/CashAidForm.jsx";

const CashDonation = () => {
  const { makeRequest } = useApi();
  const dispatch = useDispatch();

  const tableTitle = "Nakdi Yardım  Listesi";

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
  } = useGlobalState("Nakdi Yardım", cashAidInitialValues, setButtonTitle);

  const columns = [
    {
      field: "familyName",
      headerName: "Aile Adı",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "aidAmount",
      headerName: "Yardım Miktarı",
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
      field: "totalDonatedAmount",
      headerName: "Toplam Yardım Miktarı",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "startingDate",
      headerName: "Başlama Tarihi",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "endingDate",
      headerName: "Bitiş Tarihi",
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
      headerName: "Güncelleme Tarihi",
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
  const getCashAidList = async () => {
    try {
      const cashAidData = await makeRequest("get", "getCashAidList");
      if (cashAidData) {
        setData(cashAidData);
        setLoading(true);
      }
    } catch (error) {
      console.error("Bağış verileri alınırken hata oluştu:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCashAidList();
  }, []);

  // Save
  const saveCashAid = async (values, { resetForm }) => {
    try {
      await makeRequest("post", "saveCashAid", values);

      const newData = await makeRequest("get", "getCashAidList");
      setData(newData);

      dispatch(getCashBalance());

      toast.success("Bağış başarıyla kaydedildi!");
      resetForm();
      onCloseScreenDelay();
    } catch (error) {
      toast.error(
        "Bağış kaydedilemedi! Lütfen tekrar deneyin veya destek ekibiyle iletişime geçin."
      );
      console.log(error);
    }
  };

  // Update
  const updateCashAidById = async (values) => {
    console.log(values);
    try {
      await makeRequest("put", "updateCashAidById", values, selectedId);
      await getCashAidList();

      dispatch(getCashBalance());

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
  const deleteCashAidById = async () => {
    try {
      await makeRequest("delete", "deleteCashAidById", null, selectedId);
      setData(updatedData(null, "delete"));

      dispatch(getCashBalance());

      toast.success("Bağış başarıyla silindi!");
    } catch (error) {
      toast.error("Bağış silinemedi! Lütfen tekrar deneyin.");
    }
    setIsDeletedOpen(false);
  };

  const deleteSelectedCashAids = async () => {
    try {
      for (const row of selectedRows) {
        await makeRequest("delete", "deleteCashAidById", null, row);
        dispatch(getCashBalance());
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
              Component={CashAidForm}
              title={screenTitle}
              buttonTitle={buttonTitle}
              isOpen={isUpdatedOpen || isAddOpen}
              onClose={onCloseScreen}
              onSubmit={isAddOpen ? saveCashAid : updateCashAidById}
              initialValues={selectedData}
              validationSchema={cashAidYup}
              process={process}
            />
          )}

          {isDeletedOpen && (
            <DeleteScreenDialog
              openDeleteDialog={openDeleteDialog}
              closeDeleteDialog={closeDeleteDialog}
              deleteCashDonationById={
                selectedRows.length > 1
                  ? deleteSelectedCashAids
                  : deleteCashAidById
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
