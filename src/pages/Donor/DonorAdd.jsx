import React from "react";
import Label from "../../components/UI/Label/Label";
import Input from "../../components/UI/Input/Input";
import { useState } from "react";
import Select from "../../components/UI/Select/Select";
import Button from "../../components/UI/Button/Button";
import cities from "../../constants/cityItem";
import genders from "../../constants/genders";
import "../../styles/form.global.css";

export const DonorAdd = () => {
  const [selectCity, setSelectCity] = useState("");
  const [selectGender, setSelectGender] = useState("");

  const handleSelectCity = (e) => {
    setSelectCity(e.target.value);
  };

  const handleSelectGender = (e) => {
    setSelectGender(e.target.value);
  };

  return (
    <div className="form-container">
      <h1>Bağışçı Ekle</h1>
      <form className="form">
        <div className="form-container__content">
          <Label text="Bağışçı Adı:" />
          <Input type="text" />
        </div>
        <div className="form-container__content">
          <Label text="Bağışçı Soyadı:" />
          <Input type="text" />
        </div>
        <div className="form-container__content">
          <Label text="Telefon Numarası:" />
          <Input type="number" />
        </div>
        <div className="form-container__content">
          <Label text="Email:" />
          <Input type="email" />
        </div>
        <div className="form-container__content">
          <Label text="Cinsiyet:" />
          <Select
            value={selectGender}
            onChange={handleSelectGender}
            values={genders}
          />
        </div>
        <div className="form-container__content">
          <Label text="İl:" />
          <Select
            value={selectCity}
            onChange={handleSelectCity}
            values={cities}
          />
        </div>
        <div className="form-container__content">
          <Label text="İlçe:" />
          <Input type="text" />
        </div>
        <div className="form-container__content">
          <Label text="Mahalle:" />
          <Input type="text" />
        </div>
        <div className="form-container__content">
          <Label text="Sokak:" />
          <Input type="text" />
        </div>
        <Button></Button>
      </form>
    </div>
  );
};
