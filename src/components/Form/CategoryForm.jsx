import React from "react";
import Label from "../../components/UI/Label/Label";
import Button from "../UI/Button/Button";
import { Field, ErrorMessage } from "formik";

export const CategoryForm = ({ buttonTitle }) => {
  return (
    <>
      <div className="form-container__content">
        <Label text="Tür Adı:" />

        <div className="form-container__content__input-group">
          <Field type="text" name="itemName" className="form__input" />
          <ErrorMessage name="itemName" component="p" className="input-error" />
        </div>
      </div>
      <div className="form-container__content">
        <Label text="Birimi:" />
        <div className="form-container__content__input-group">
          <Field type="text" name="unit" className="form__input" />
          <ErrorMessage name="unit" component="p" className="input-error" />
        </div>
      </div>
      <Button type="submit" title={buttonTitle}></Button>
    </>
  );
};

export default CategoryForm;
