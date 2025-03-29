import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCashBalance } from "../../../redux/cashSlice";
import { useGlobalState } from "../../../hooks/useGlobalState.js";
import useApi from "../../../hooks/useApi .js";
import Button from "@mui/material/Button";
import { Skeleton, Box } from "@mui/material";
import { toast, Toaster } from "react-hot-toast";
import { otherIncomeInitialValues } from "../../../formik&yup/initalValues.js";
import { otherIncomeYup } from "../../../formik&yup/yup.js";
import FormDialog from "../../../components/Dialog/FormScreenDialog/FormDialog.jsx";
import DeleteScreenDialog from "../../../components/Dialog/DeleteScreenDialog/DeleteScreenDialog.jsx";
import Table from "../../../components/UI/Table/Table.jsx";
import OtherIncomeForm from "../../../components/Form/OtherIncomeForm.jsx";

const Family = () => {
  const { makeRequest } = useApi();
  const dispatch = useDispatch();

  const tableTitle = "Diğer Gelirler Listesi";

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
  } = useGlobalState("Gelir", otherIncomeInitialValues, setButtonTitle);

  const columns = [
    {
      field: "description",
      headerName: "Açıklama",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "amount",
      headerName: "Gelir Miktarı",
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

  const updatedData = (values, process = "update") => {
    if (process === "update") {
      return data.map((item) => {
        if (item.id === selectedId) {
          const today = new Date();
          const formattedDate = `${today.getFullYear()}-${String(
            today.getMonth() + 1
          ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

          return { ...item, ...values, modifiedDate: formattedDate };
        }
        return item;
      });
    } else {
      return data.filter((item) => item.id !== selectedId);
    }
  };

  const getOtherIncomeList = async () => {
    try {
      const otherIncomeData = await makeRequest("get", "getOtherIncomeList");
      if (otherIncomeData) {
        setData(otherIncomeData);
        setLoading(true);
      }
    } catch (error) {
      console.error("Bağış verileri alınırken hata oluştu:", error);
      setLoading(false);
    }
  };

  // list
  useEffect(() => {
    getOtherIncomeList();
  }, []);

  // Save
  const saveOtherIncome = async (values, { resetForm }) => {
    try {
      await makeRequest("post", "saveOtherIncome", values);

      const newData = await makeRequest("get", "getOtherIncomeList");
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
  const updateOtherIncomeById = async (values) => {
    console.log(values);
    try {
      await makeRequest("put", "updateOtherIncomeById", values, selectedId);
      setData(updatedData(values));

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
  const deleteOtherIncomeById = async () => {
    try {
      await makeRequest("delete", "deleteOtherIncomeById", null, selectedId);
      setData(updatedData(null, "delete"));

      dispatch(getCashBalance());

      toast.success("Bağış başarıyla silindi!");
    } catch (error) {
      toast.error("Bağış silinemedi! Lütfen tekrar deneyin.");
    }
    setIsDeletedOpen(false);
  };

  const deleteOtherIncomes = async () => {
    try {
      for (const row of selectedRows) {
        await makeRequest("delete", "deleteOtherIncomeById", null, row);
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
              Component={OtherIncomeForm}
              title={screenTitle}
              buttonTitle={buttonTitle}
              isOpen={isUpdatedOpen || isAddOpen}
              onClose={onCloseScreen}
              onSubmit={isAddOpen ? saveOtherIncome : updateOtherIncomeById}
              initialValues={selectedData}
              validationSchema={otherIncomeYup}
              process={process}
            />
          )}

          {isDeletedOpen && (
            <DeleteScreenDialog
              openDeleteDialog={openDeleteDialog}
              closeDeleteDialog={closeDeleteDialog}
              deleteCashDonationById={
                selectedRows.length > 1
                  ? deleteOtherIncomes
                  : deleteOtherIncomeById
              }
            />
          )}
          <Toaster position="top-center" reverseOrder={false} />
        </>
      )}
    </div>
  );
};

export default Family;
