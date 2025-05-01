import React, { useEffect, useState } from "react";
import Label from "../../components/UI/Label/Label";
import Button from "../UI/Button/Button";
import Select from "react-select";
import { Field, ErrorMessage } from "formik";

const UserForm = ({ buttonTitle }) => {
  const { values } = useFormikContext();

  const [role, selectedRole] = useState();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const values = ["SUPER_ADMIN,ADMIN,PERSONEL"];
    setRoles(values);
  }, []);

  useEffect(() => {
    values.role = role;
  }, [role]);

  const handleRole = (selectedOption) => {
    selectedRole(selectedOption);
  };

  return (
    <>
      <div className="form-container__content">
        <Label text="Kullanıcı Adı:" />

        <div className="form-container__content__input-group">
          <Field type="text" name="username" className="form__input" />
          <ErrorMessage name="username" component="p" className="input-error" />
        </div>
      </div>
      <div className="form-container__content">
        <Label text="Email:" />
        <div className="form-container__content__input-group">
          <Field type="email" name="email" className="form__input" />
          <ErrorMessage name="email" component="p" className="input-error" />
        </div>
      </div>

      <div className="form-container__content">
        <Label text="Password:" />
        <div className="form-container__content__input-group">
          <Field type="password" name="password" className="form__input" />
          <ErrorMessage name="password" component="p" className="input-error" />
        </div>
      </div>

      <div className="form-container__content">
        <Label text="Rolu:" />
        <div className="form-container__content__input-group">
          <Select
            className="form__select"
            value={role}
            onChange={handleRole}
            options={roles}
            isSearchable={true}
            placeholder="Rol seçiniz"
          />
          <ErrorMessage name="role" component="p" className="input-error" />
        </div>
      </div>

      <Button type="submit" title={buttonTitle}></Button>
    </>
  );
};

export default UserForm;
