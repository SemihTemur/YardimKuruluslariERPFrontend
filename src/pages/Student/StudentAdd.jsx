import React from "react";
import Label from "../../components/UI/Label/Label";
import Input from "../../components/UI/Input/Input";
import { useState } from "react";
import Select from "../../components/UI/Select/Select";
import Button from "../../components/UI/Button/Button";
import cities from "../../constants/cityItem";
import genders from "../../constants/genders";
import { educationLevel } from "../../constants/educationLevel";
import FormikWrapper from "../../formik&yup/FormikWrapper";

export const StudentAdd = () => {
  const [selectCity, setSelectCity] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [selectEducation, setSelectEducation] = useState("");

  const handleSelectCity = (e) => {
    setSelectCity(e.target.value);
  };

  const handleSelectGender = (e) => {
    setSelectGender(e.target.value);
  };

  const handleSelectEducation = (e) => {
    setSelectEducation(e.target.value);
  };

  return (
    <div className="form-container">
      <h1>Öğrenci Ekle</h1>
      <FormikWrapper></FormikWrapper>
    </div>
  );
};

export default StudentAdd;
