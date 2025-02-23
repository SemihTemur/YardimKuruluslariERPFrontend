import React, { useState, useEffect } from "react";
import information from "../../../constants/simdilikOgrenciİsmi";
import Label from "../../../components/UI/Label/Label";
import Select from "../../../components/UI/Select/Select";
import Input from "../../../components/UI/Input/Input";
import categoryItem from "../../../constants/categoryItem";
import Button from "../../../components/UI/Button/Button";
import "../../../styles/form.global.css";

export const InKindDonationAdd = () => {
  const [selectDonorFirstName, setSelectDonorFirstName] = useState("");
  const [selectDonorLastName, setSelectDonorLastName] = useState("");
  const [filteredDonorName, setFilteredDonorName] = useState([]);
  const [filteredDonorLastName, setFilteredDonorLastName] = useState([]);
  const [firstSelected, setFirstSelected] = useState(null); // İlk seçim kontrolü için state

  //itemName and unit
  const [selectItem, setSelectItem] = useState("");
  const [selectUnit, setSelectUnit] = useState("");
  const [filteredSelectItem, setFilteredSelectItem] = useState([]);
  const [filteredSelectUnit, setFilteredSelectUnit] = useState([]);
  const [secondSelected, setSecondSelected] = useState(null); // İlk seçim kontrolü için state

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

  // Item and  unit

  const handleSelectItem = (e) => {
    setSelectItem(e.target.value);
    if (!secondSelected) setSecondSelected("item");
  };

  const handleSelectUnit = (e) => {
    setSelectUnit(e.target.value);
    if (!secondSelected) setSecondSelected("unit");
  };

  const filterItemOrUnit = (key, compare, selectValue) => {
    return [
      ...new Set(
        categoryItem
          .filter((item) => item[compare] === selectValue)
          .map((item) => item[key])
      ),
    ];
  };

  useEffect(() => {
    if (secondSelected === "item") {
      // İlk seçim ad ise sadece soyadı filtrele
      setFilteredSelectUnit(filterItemOrUnit("unit", "item", selectItem));
    } else {
      setFilteredSelectItem([
        ...new Set(categoryItem.map((item) => item.item)),
      ]); // Tüm soyadları göster
    }
  }, [selectItem]);

  useEffect(() => {
    if (secondSelected === "unit") {
      // İlk seçim soyad ise sadece adı filtrele
      setFilteredSelectItem(filterItemOrUnit("item", "unit", selectUnit));
    } else {
      setFilteredSelectUnit([
        ...new Set(categoryItem.map((item) => item.unit)),
      ]); // Tüm soyadları göster
    }
  }, [selectUnit]);

  return (
    <div className="form-container">
      <h1>Ayni Bağış Ekle</h1>
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
          <Label text="Ürün" />
          <Select
            value={selectItem}
            onChange={handleSelectItem}
            values={filteredSelectItem}
          />
        </div>
        <div className="form-container__content">
          <Label text="Birim:" />
          <Select
            value={selectUnit}
            onChange={handleSelectUnit}
            values={filteredSelectUnit}
          />
        </div>
        <div className="form-container__content">
          <Label text="Miktarı:" />
          <Input type="number" />
        </div>
        <Button></Button>
      </form>
    </div>
  );
};
export default InKindDonationAdd;
