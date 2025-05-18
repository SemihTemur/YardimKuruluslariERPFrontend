import React, { useEffect, useState } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import Label from "../../components/UI/Label/Label";
import Button from "../UI/Button/Button";
import Select from "react-select";
import useApi from "../../hooks/useApi ";
import { toast } from "react-hot-toast";

const UserForm = ({ process, buttonTitle }) => {
  const { values } = useFormikContext();

  const { makeRequest } = useApi();

  const [roleData, setRoleData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filteredRole, setFilteredRole] = useState();
  const [roleInfo, setRoleInfo] = useState();

  useEffect(() => {
    const roleNames = async () => {
      try {
        const data = await makeRequest("get", "getRoles");
        setRoleData(data);
        setLoading(true);
      } catch (error) {
        toast.error("Veri alınırken hata oluştu", error);
      }
    };
    roleNames();
  }, []);

  useEffect(() => {
    if (loading) {
      const roleNames = roleData.map((role) => ({
        value: role,
        label: role,
      }));
      setFilteredRole(roleNames);

      if (process === "update") {
        values.password = "";
        const item = {
          value: values.roleName,
          label: values.roleName,
        };
        setRoleInfo(item);
      }
    }
  }, [loading]);

  useEffect(() => {
    if (loading && roleInfo) {
      values.roleName = roleInfo.value;
      console.log(values);
    }
  }, [roleInfo]);

  const handleRole = (selectedOption) => {
    setRoleInfo(selectedOption);
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
            value={roleInfo}
            onChange={handleRole}
            options={filteredRole}
            isSearchable={true}
            placeholder="Rol seçiniz"
          />
          <ErrorMessage name="roleName" component="p" className="input-error" />
        </div>
      </div>

      <Button type="submit" title={buttonTitle}></Button>
    </>
  );
};

export default UserForm;
