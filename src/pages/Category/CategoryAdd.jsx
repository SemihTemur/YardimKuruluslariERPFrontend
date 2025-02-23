import React from "react";
import Label from "../../components/UI/Label/Label";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import "../../styles/form.global.css";

export const CategoryAdd = () => {
  return (
    <div className="form-container">
      <h1>Ürün Ekle</h1>
      <form className="form">
        <div className="form-container__content">
          <Label text="Ürün Adı:" />
          <Input type="text" />
        </div>
        <div className="form-container__content">
          <Label text="Birim:" />
          <Input type="text" />
        </div>
        <Button></Button>
      </form>
    </div>
  );
};

export default CategoryAdd;
