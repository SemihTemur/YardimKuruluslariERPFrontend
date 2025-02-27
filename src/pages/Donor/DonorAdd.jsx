import React from "react";
import "../../styles/form.global.css";
import { donorInitialValues } from "../../formik&yup/initalValues";
import { donorYup } from "../../formik&yup/yup";
import DonorForm from "../../components/Form/DonorForm";
import useApi from "../../hooks/useApi ";
import FormikWrapper from "../../components/Form/FormikWrapper";

export const DonorAdd = () => {
  const { makeRequest } = useApi();

  const saveDonor = async (values, { resetForm }) => {
    await makeRequest("post", "saveDonor", values);
    resetForm();
    console.log(values);
  };

  return (
    <FormikWrapper
      process={saveDonor}
      initialValues={donorInitialValues}
      yup={donorYup}
    >
      <DonorForm />
    </FormikWrapper>
  );
};
