import React from "react";
import Form from "../../components/UI/Form/Form";
import Label from "../../components/UI/Label";
import Input from "../../components/UI/Input";

export const FamilyAddPage = () => {
  return (
    <div className="form-container">
      <Form>
        <div className="form-container__content">
          <Label text="Aile'nin ismini giriniz :" />
          <Input type="text" />
        </div>
      </Form>
    </div>
  );
};
