import { useState } from "react";
import Label from "../../../components/UI/Label/Label";
import Select from "../../../components/UI/Select/Select";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import families from "../../../constants/Family";
import periodType from "../../../constants/periodTypes";

export const InKindAidAdd = () => {
  const [selectFamily, setSelectFamily] = useState("");
  const [selectPeriodType, setSelectPeriodType] = useState("");
  const [selectItem, setSelectItem] = useState("");

  const handleSelectFamily = (e) => {
    setSelectFamily(e.target.value);
  };

  const handleSelectPeriodType = (e) => {
    setSelectPeriodType(e.target.value);
  };

  const handleSelectItem = (e) => {
    setSelectItem(e.target.value);
  };

  return (
    <div className="form-container">
      <h1>Ayni Yardım Ekle</h1>
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
          <Label text="Ürün" />
          <Select
            value={selectItem}
            onChange={handleSelectItem}
            values={families}
          />
        </div>
        <div className="form-container__content">
          <Label text="Miktarı:" />
          <Input type="number" />
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

export default InKindAidAdd;
