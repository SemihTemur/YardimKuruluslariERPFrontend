import React from "react";
import { Formik, Form } from "formik";
import "../../styles/form.global.css";

const FormikWrapper = ({ process, initialValues, yup, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={yup}
      onSubmit={process}
      enableReinitialize={true}
    >
      <Form className="form">{children}</Form>
    </Formik>
  );
};

export default FormikWrapper;
