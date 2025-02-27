import React from "react";
import FormikWrapper from "../../components/Form/FormikWrapper";
import { studentInitialValues } from "../../formik&yup/initalValues";
import { studentYup } from "../../formik&yup/yup";
import StudentForm from "../../components/Form/StudentForm";
import useApi from "../../hooks/useApi ";

export const StudentAdd = () => {
  const { makeRequest } = useApi();

  const saveStudent = async (values, { resetForm }) => {
    await makeRequest("post", "saveStudent", values);
    resetForm();
    console.log(values);
  };

  return (
    <div className="form-container">
      <h1>Öğrenci Ekle</h1>
      <FormikWrapper
        process={saveStudent}
        initialValues={studentInitialValues}
        yup={studentYup}
      >
        <StudentForm formik={formik} />
      </FormikWrapper>
    </div>
  );
};

export default StudentAdd;
