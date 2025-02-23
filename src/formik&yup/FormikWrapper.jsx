import React from "react";
import { useFormik } from "formik";
import { familyYup } from "./yup"; // Eğer geçerli validation kullanıyorsanız
import "../styles/form.global.css";

const FormikWrapper = ({ process, initialValues, children }) => {
  // Formik hook'u doğru şekilde başlatılıyor
  const formik = useFormik({
    initialValues: initialValues, // initialValues burada düzgünce aktarılıyor
    validationSchema: familyYup,
    onSubmit: process,
    enableReinitialize: true,
  });

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      {children(formik)}{" "}
      {/* Formik'e children'i ve formik objesini geçiriyoruz */}
    </form>
  );
};

export default FormikWrapper;
