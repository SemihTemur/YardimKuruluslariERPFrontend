import React, { useEffect, useState } from "react";
import information from "../../../constants/simdilikOgrenciİsmi";
import Label from "../../../components/UI/Label/Label";
import Select from "../../../components/UI/Select/Select";
import Input from "../../../components/UI/Input/Input";
import currencyType from "../../../constants/currencyType";
import Button from "../../../components/UI/Button/Button";
import "../../../styles/form.global.css";

const CashDonationAdd = () => {
  const [selectDonorFirstName, setSelectDonorFirstName] = useState("");
  const [selectDonorLastName, setSelectDonorLastName] = useState("");
  const [filteredDonorName, setFilteredDonorName] = useState([]);
  const [filteredDonorLastName, setFilteredDonorLastName] = useState([]);
  const [firstSelected, setFirstSelected] = useState(null); // İlk seçim kontrolü için state

  const [selectCurrencyType, setSelectCurrencyType] = useState("");

  const handleSelectCurrencyType = (e) => {
    setSelectCurrencyType(e.target.value);
  };

  const handleSelectDonorFirstName = (e) => {
    setSelectDonorFirstName(e.target.value);
    if (!firstSelected) setFirstSelected("name"); // İlk seçim ad olursa kaydet
  };

  const handleSelectDonorLastName = (e) => {
    setSelectDonorLastName(e.target.value);
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
      setFilteredDonorLastName(
        filterNamesOrSurnames("soyad", "ad", selectDonorFirstName)
      );
      setFilteredDonorName([...new Set(information.map((item) => item.ad))]); // Tüm adları göster
    } else {
      setFilteredDonorLastName([
        ...new Set(information.map((item) => item.soyad)),
      ]); // Tüm soyadları göster
    }
  }, [selectDonorFirstName]);

  useEffect(() => {
    if (firstSelected === "surname") {
      // İlk seçim soyad ise sadece adı filtrele
      setFilteredDonorName(
        filterNamesOrSurnames("ad", "soyad", selectDonorLastName)
      );
      setFilteredDonorLastName([
        ...new Set(information.map((item) => item.soyad)),
      ]); // Tüm soyadları göster
    } else {
      setFilteredDonorName([...new Set(information.map((item) => item.ad))]); // Tüm adları göster
    }
  }, [selectDonorLastName]);

  return (
    <div className="form-container">
      <h1>Nakdi Bağış Ekle</h1>
      <form className="form">
        <div className="form-container__content">
          <Label text="Bağışçı Adı:" />
          <Select
            value={selectDonorFirstName}
            onChange={handleSelectDonorFirstName}
            values={filteredDonorName}
          />
        </div>
        <div className="form-container__content">
          <Label text="Bağışçı Soyadı:" />
          <Select
            value={selectDonorLastName}
            onChange={handleSelectDonorLastName}
            values={filteredDonorLastName}
          />
        </div>
        <div className="form-container__content">
          <Label text="Yardım Miktarı:" />
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
        <Button></Button>
      </form>
    </div>
  );
};

export default CashDonationAdd;
