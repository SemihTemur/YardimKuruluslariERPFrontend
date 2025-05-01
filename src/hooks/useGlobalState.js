import { useState, useEffect } from "react";

export const useGlobalState = (title, initialValues, setButtonTitle) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedData, setSelectedData] = useState([]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdatedOpen, setIsUpdatedOpen] = useState(false);
  const [isDeletedOpen, setIsDeletedOpen] = useState(false);

  const [filteredRows, setFilteredRows] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const [selectedId, setSelectedId] = useState(null);
  const [process, setProcess] = useState("");

  const [searchText, setSearchText] = useState("");
  const [screenTitle, setScreenTitle] = useState(null);

  const paginationModel = { page: 0, pageSize: 5 };

  useEffect(() => {
    setFilteredRows(data);
  }, [data]);

  const updatedDatas = (processData, process) => {
    if (process == "save") {
      setData((prev) => [...(Array.isArray(prev) ? prev : []), processData]);
    } else if (process == "update") {
      setData((prev) =>
        prev.map((item) => {
          if (item.baseResponse.id === processData.baseResponse.id) {
            return processData;
          }
          return item;
        })
      );
    } else {
      setData((prev) =>
        prev.filter(
          (item) => item.baseResponse.id !== processData.baseResponse.id
        )
      );
    }
  };

  const onCloseScreenDelay = () => {
    setTimeout(() => {
      setIsAddOpen(false);
      setIsUpdatedOpen(false);
    }, 300);
  };

  // Screens
  const openAddScreen = () => {
    setProcess("create");
    setScreenTitle(`${title} Ekle`);
    setButtonTitle("Kaydet");
    setSelectedData(initialValues);
    setIsAddOpen(true);
    setIsUpdatedOpen(false);
  };

  const openUpdateScreen = (item, id) => {
    setProcess("update");
    setScreenTitle(`${title} Güncelleme`);
    setButtonTitle("Güncelle");
    setSelectedId(id);
    setSelectedData(item);
    setIsAddOpen(false);
    setIsUpdatedOpen(true);
    console.log(selectedData);
  };

  const onCloseScreen = () => {
    setIsUpdatedOpen(false);
    setIsAddOpen(false);
  };

  const openDeleteDialog = (id) => {
    setSelectedId(id);
    setIsDeletedOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeletedOpen(false);
    setSelectedRows([]);
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

  return {
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
  };
};
