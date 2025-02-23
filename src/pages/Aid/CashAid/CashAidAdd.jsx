import React, { useState } from "react";
import Label from "../../../components/UI/Label/Label";
import Select from "../../../components/UI/Select/Select";
import Input from "../../../components/UI/Input/Input";
import currencyType from "../../../constants/currencyType";
import Button from "../../../components/UI/Button/Button";
import families from "../../../constants/Family";
import periodType from "../../../constants/periodTypes";

const CashAidAdd = () => {
  const [selectFamily, setSelectFamily] = useState("");
  const [selectCurrencyType, setSelectCurrencyType] = useState("");
  const [selectPeriodType, setSelectPeriodType] = useState("");

  const handleSelectFamily = (e) => {
    setSelectFamily(e.target.value);
  };

  const handleSelectCurrencyType = (e) => {
    setSelectCurrencyType(e.target.value);
  };

  const handleSelectPeriodType = (e) => {
    setSelectPeriodType(e.target.value);
  };

  return (
    <div className="form-container">
      <h1>Nakdi Yardım Ekle</h1>
      <form className="form">
        <div className="form-container__content">
          <Label text="Aile Adı:" />
          <Select
            value={selectFamily}
            onChange={handleSelectFamily}
            values={families}
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
        <div className="form-container__content">
          <Label text="Süre:" />
          <Input type="number" />
        </div>
        <div className="form-container__content">
          <Label text="Dönem:" />
          <Select
            value={selectPeriodType}
            onChange={handleSelectPeriodType}
            values={periodType}
          />
        </div>
        <Button></Button>
      </form>
    </div>
  );
};

export default CashAidAdd;
