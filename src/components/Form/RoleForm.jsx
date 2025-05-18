import React from "react";
import Label from "../../components/UI/Label/Label";
import Button from "../UI/Button/Button";
import { Field, ErrorMessage } from "formik";

export const RoleForm = ({ buttonTitle }) => {
  return (
    <>
      <div className="form-container__content">
        <Label text="Rol Adı:" />
        <div className="form-container__content__input-group">
          <Field type="text" name="roleName" className="form__input" />
          <ErrorMessage name="roleName" component="p" className="input-error" />
        </div>
      </div>
      <Button type="submit" title={buttonTitle}></Button>
    </>
  );
};

export default RoleForm;
