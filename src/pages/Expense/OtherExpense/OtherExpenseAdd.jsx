import React, { useState } from "react";
import Label from "../../../components/UI/Label/Label";
import Select from "../../../components/UI/Select/Select";
import Input from "../../../components/UI/Input/Input";
import currencyType from "../../../constants/currencyType";
import Button from "../../../components/UI/Button/Button";
import "../../../styles/form.global.css";

export const OtherExpense = () => {
  const [selectCurrencyType, setSelectCurrencyType] = useState("");

  const handleSelectCurrencyType = (e) => {
    setSelectCurrencyType(e.target.value);
  };

  return (
    <div className="form-container">
      <h1>Diğer Gider Ekle</h1>
      <form className="form">
        <div className="form-container__content">
          <Label text="Açıklama:" />
          <Input type="text" />
        </div>
        <div className="form-container__content">
          <Label text="Miktar:" />
          <Input type="text" />
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

export default OtherExpense;
