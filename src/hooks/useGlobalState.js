import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useGlobalState = (
  componentName,
  title,
  initialValues,
  setButtonTitle
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

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

  const [isPermission, setIsPermission] = useState(0);

  const paginationModel = { page: 0, pageSize: 5 };

  useEffect(() => {
    setFilteredRows(data);
  }, [data]);

  const hasRole = (role) => {
    if (user?.authorities?.includes("ROLE_SUPER_ADMIN")) {
      return true;
    }
    return user?.authorities?.includes(role);
  };

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
    if (hasRole(`${componentName}_SAVE`)) {
      setIsPermission(-1);
      setProcess("create");
      setScreenTitle(`${title} Ekle`);
      setButtonTitle("Kaydet");
      setSelectedData(initialValues);
      setIsAddOpen(true);
      setIsUpdatedOpen(false);
    } else {
      setIsPermission((prev) => prev + 2);
    }
  };

  const openUpdateScreen = (item, id) => {
    if (hasRole(`${componentName}_UPDATE`)) {
      setIsPermission(-1);
      setProcess("update");
      setScreenTitle(`${title} Güncelleme`);
      setButtonTitle("Güncelle");
      setSelectedId(id);
      setSelectedData(item);
      setIsAddOpen(false);
      setIsUpdatedOpen(true);
    } else {
      setIsPermission((prev) => prev + 2);
    }
  };

  const onCloseScreen = () => {
    setIsUpdatedOpen(false);
    setIsAddOpen(false);
  };

  const openDeleteDialog = (id) => {
    if (hasRole(`${componentName}_DELETE`)) {
      setIsPermission(-1);
      setSelectedId(id);
      setIsDeletedOpen(true);
    } else {
      setIsPermission((prev) => prev + 2);
    }
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
    isPermission,
    user,
    hasRole,
  };
};
