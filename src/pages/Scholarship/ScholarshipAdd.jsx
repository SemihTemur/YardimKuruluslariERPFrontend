import React, { useEffect, useState } from "react";
import information from "../../constants/simdilikOgrenciİsmi";
import Label from "../../components/UI/Label/Label";
import Select from "../../components/UI/Select/Select";
import Input from "../../components/UI/Input/Input";
import currencyType from "../../constants/currencyType";
import periodType from "../../constants/periodTypes";
import Button from "../../components/UI/Button/Button";
import "../../styles/form.global.css";

const ScholarshipAdd = () => {
  const [selectStudentName, setSelectStudentName] = useState("");
  const [selectStudentSurname, setSelectStudentSurname] = useState("");
  const [filteredName, setFilteredName] = useState([]);
  const [filteredSurname, setFilteredSurname] = useState([]);
  const [firstSelected, setFirstSelected] = useState(null); // İlk seçim kontrolü için state

  const [selectCurrencyType, setSelectCurrencyType] = useState("");

  const [selectPeriodType, setSelectPeriodType] = useState("");

  const handleSelectCurrencyType = (e) => {
    selectCurrencyType(e.target.value);
  };

  const handleSelectPeriodType = (e) => {
    setSelectPeriodType(e.target.value);
  };

  const handleSelectStudentName = (e) => {
    setSelectStudentName(e.target.value);
    if (!firstSelected) setFirstSelected("name"); // İlk seçim ad olursa kaydet
  };

  const handleSelectStudentSurname = (e) => {
    setSelectStudentSurname(e.target.value);
    if (!firstSelected) setFirstSelected("surname"); // İlk seçim soyad olursa kaydet
  };

  const filterNamesOrSurnames = (key, compare, selectValue) => {
    return [
      ...new Set(
        information
          .filter((item) => item[compare] === selectValue)
          .map((item) => item[key])
      ),
    ];
  };

  useEffect(() => {
    if (firstSelected === "name") {
      // İlk seçim ad ise sadece soyadı filtrele
      setFilteredSurname(
        filterNamesOrSurnames("soyad", "ad", selectStudentName)
      );
      setFilteredName([...new Set(information.map((item) => item.ad))]); // Tüm adları göster
    } else {
      setFilteredSurname([...new Set(information.map((item) => item.soyad))]); // Tüm soyadları göster
    }
  }, [selectStudentName]);

  useEffect(() => {
    if (firstSelected === "surname") {
      // İlk seçim soyad ise sadece adı filtrele
      setFilteredName(
        filterNamesOrSurnames("ad", "soyad", selectStudentSurname)
      );
      setFilteredSurname([...new Set(information.map((item) => item.soyad))]); // Tüm soyadları göster
    } else {
      setFilteredName([...new Set(information.map((item) => item.ad))]); // Tüm adları göster
    }
  }, [selectStudentSurname]);

  return (
    <div className="form-container">
      <h1>Burs Ekle</h1>
      <form className="form">
        <div className="form-container__content">
          <Label text="Öğrenci Adı:" />
          <Select
            value={selectStudentName}
            onChange={handleSelectStudentName}
            values={filteredName}
          />
        </div>
        <div className="form-container__content">
          <Label text="Öğrenci Soyadı:" />
          <Select
            value={selectStudentSurname}
            onChange={handleSelectStudentSurname}
            values={filteredSurname}
          />
        </div>
        <div className="form-container__content">
          <Label text="Burs Miktarı:" />
          <Input type="number" />
        </div>
        <div className="form-container__content">
          <Label text="Para Birimi:" />
          <Select
            value={selectCurrencyType}
            onChange={handleSelectCurrencyType}
            values={currencyType}
          />
        </div>
        <div className="form-container__content">
          <Label text="Dönem:" />
          <Select
            value={selectPeriodType}
            onChange={handleSelectPeriodType}
            values={periodType}
          />
        </div>
        <div className="form-container__content">
          <Label text="Süre:" />
          <Input type="number" />
        </div>
        <Button></Button>
      </form>
    </div>
  );
};

export default ScholarshipAdd;
