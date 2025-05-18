import React, { useEffect, useState } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import Label from "../../components/UI/Label/Label";
import Button from "../UI/Button/Button";
import Select from "react-select";
import useApi from "../../hooks/useApi ";
import { toast } from "react-hot-toast";
import entityName from "../../constants/entityName";
import actionType from "../../constants/actionType";

const PermissionForm = ({ process, buttonTitle }) => {
  const { values } = useFormikContext();

  const { makeRequest } = useApi();

  const [roleData, setRoleData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filteredRole, setFilteredRole] = useState();
  const [roleInfo, setRoleInfo] = useState();

  const [entityNameInfo, setEntityNameInfo] = useState();

  const [actionTypeInfo, setActionTypeInfo] = useState();

  const updatedValues = () => {
    const roleData = {
      value: values.roleName,
      label: values.roleName,
    };

    const entityNameData = {
      value: values.entityName,
      label: values.entityName,
    };

    const actionTypeData = {
      value: values.actionType,
      label: values.actionType,
    };

    setRoleInfo(roleData);
    setEntityNameInfo(entityNameData);
    setActionTypeInfo(actionTypeData);
  };

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
        updatedValues();
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

  const handleEntityName = (selectedOption) => {
    setEntityNameInfo(selectedOption);
    values.entityName = selectedOption.value;
  };

  const handleActionType = (selectedOption) => {
    setActionTypeInfo(selectedOption);
    values.actionType = selectedOption.value;
    console.log(values);
  };

  return (
    <>
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

      <div className="form-container__content">
        <Label text="Yetki Verilecek Alan:" />
        <div className="form-container__content__input-group">
          <Select
            className="form__select"
            value={entityNameInfo}
            onChange={handleEntityName}
            options={entityName}
            isSearchable={true}
            placeholder="Rol seçiniz"
          />
          <ErrorMessage
            name="entityName"
            component="p"
            className="input-error"
          />
        </div>
      </div>

      <div className="form-container__content">
        <Label text="Verilecek Yetki Türü:" />
        <div className="form-container__content__input-group">
          <Select
            className="form__select"
            value={actionTypeInfo}
            onChange={handleActionType}
            options={actionType}
            isSearchable={true}
            placeholder="Rol seçiniz"
          />
          <ErrorMessage
            name="actionType"
            component="p"
            className="input-error"
          />
        </div>
      </div>

      <Button type="submit" title={buttonTitle}></Button>
    </>
  );
};

export default PermissionForm;
