import React from "react";
import "../../styles/form.global.css";
import useApi from "../../hooks/useApi ";
import { categoryInitialValues } from "../../formik&yup/initalValues";
import { categoryYup } from "../../formik&yup/yup";
import FormikWrapper from "../../components/Form/FormikWrapper";
import CategoryForm from "../../components/Form/CategoryForm";

export const CategoryAdd = () => {
  const { makeRequest } = useApi();

  const saveCategory = async (values, { resetForm }) => {
    await makeRequest("post", "saveCategory", values);
    resetForm();
  };

  return (
    <div className="form-container">
      <h1>Ürün Ekle</h1>
      <FormikWrapper
        process={saveCategory}
        initialValues={categoryInitialValues}
        yup={categoryYup}
      >
        {(formik) => <CategoryForm formik={formik} />}
      </FormikWrapper>
    </div>
  );
};

export default CategoryAdd;
