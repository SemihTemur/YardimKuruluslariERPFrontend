import { useState } from "react";

export const useSpecificState = (title) => {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [filteredRows, setFilteredRows] = useState([]);

  const [searchText, setSearchText] = useState("");

  const tableTitle = title;

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
    filteredRows,
    setFilteredRows,
    searchText,
    tableTitle,
    handleSearch,
  };
};
