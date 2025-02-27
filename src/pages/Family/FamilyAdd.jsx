import React from "react";
import FormikWrapper from "../../components/Form/FormikWrapper";
import { familyInitialValues } from "../../formik&yup/initalValues";
import { familyYup } from "../../formik&yup/yup";

import useApi from "../../hooks/useApi ";
import FamilyForm from "../../components/Form/FamilyForm";

const FamilyAddPage = () => {
  const { makeRequest } = useApi();

  const saveFamily = async (values, { resetForm }) => {
    await makeRequest("post", "saveFamily", values);
    resetForm();
  };

  return (
    <div className="form-container">
      <h1>Aile Ekle</h1>
      <FormikWrapper
        process={saveFamily}
        initialValues={familyInitialValues}
        yup={familyYup}
      >
        <FamilyForm />
      </FormikWrapper>
    </div>
  );
};

export default FamilyAddPage;
