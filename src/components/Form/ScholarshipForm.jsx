import React, { useState, useEffect } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import useApi from "../../hooks/useApi ";
import currencyType from "../../constants/currencyType";
import periodType from "../../constants/periodTypes";
import { Skeleton, Box } from "@mui/material";
import Label from "../UI/Label/Label";
import Button from "../UI/Button/Button";
import Select from "react-select";

const ScholarshipForm = ({ process, buttonTitle }) => {
  const { values, setFieldValue } = useFormikContext();

  const [filteredStudentNames, setFilteredStudentNames] = useState([]);

  const { makeRequest } = useApi();

  const [studentData, setStudentData] = useState(null);

  const [loading, setLoading] = useState(false);

  // Select'tekı secılen degerı yakalamak ıcın yazılan degısken
  const [studentInfo, setStudentInfo] = useState(null);

  const [period, setPeriod] = useState(null);

  const updatedValues = () => {
    const studentData = {
      value: `${values.studentName} ${values.studentSurname}`,
      label: `${values.studentName} ${values.studentSurname}`,
    };

    const periodData = {
      value: values.period,
      label: values.period,
    };

    setStudentInfo(studentData);

    setPeriod(periodData);
  };

  // veriyi sunucudan çekiyorum.
  useEffect(() => {
    // kayıtlı bagıscı ısım ve soyısımlerı al
    const getStudentNames = async () => {
      try {
        const data = await makeRequest("get", "getStudentNameAndSurnameList");
        setStudentData(data);
        setLoading(true);
      } catch (error) {
        console.error("Veri alınırken hata oluştu", error);
      }
    };

    getStudentNames();
  }, []);

  // gelen veriyi select 2'ye uygun hala getırıyorum.ve filteredDonorName'e aktarıyorum
  useEffect(() => {
    if (loading) {
      const studentNames = studentData.map((item) => ({
        value: `${item.studentName} ${item.studentSurname}`,
        label: `${item.studentName} ${item.studentSurname}`, // React Select için uygun formatta düzenleme
      }));

      setFilteredStudentNames(studentNames);
      console.log(process);
      // eüer işlem update ise başlangıcta kaydedılen degerı goster guncelleme ekranında
      if (process === "update") {
        updatedValues();
      }
    }
  }, [loading]);

  // donorInfo secildiğinde select kısmında formik'teki yapıyı aktarıyorum,değerleri ayırıp
  useEffect(() => {
    // veriler gelmeden çalışmaması ıcın loading kontrolu yapıyorum
    if (loading && studentInfo) {
      setFieldValue("studentName", studentInfo.value.split(" ")[0] || ""); // Öğrencinin adını al
      setFieldValue("studentSurname", studentInfo.value.split(" ")[1] || ""); // Öğrencinin soyadını al
    }
  }, [studentInfo]);

  useEffect(() => {
    if (loading && period) {
      setFieldValue("period", period.value);
      if (period.value === "Tek Seferlik") setFieldValue("duration", 1);
    }
  }, [period]);

  const handleStudentNames = (selectedOption) => {
    setStudentInfo(selectedOption);
    console.log(studentInfo);
  };

  const handlePeriod = (selectedOption) => {
    setPeriod(selectedOption);
  };

  return (
    <>
      {!loading ? (
        <Box className="loading_screen">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Box>
      ) : (
        <>
          <div className="form-container__content">
            <Label text="Öğrenci Bilgileri:" />
            <div className="form-container__content__input-group">
              <Select
                className="form__select"
                value={studentInfo}
                onChange={handleStudentNames}
                options={filteredStudentNames}
                isSearchable={true}
                filterOption={(option, input) =>
                  option.label
                    .toLocaleLowerCase("tr")
                    .includes(input.toLocaleLowerCase("tr"))
                }
                placeholder="Öğrenci seçiniz"
              />
              <ErrorMessage
                name="studentName"
                component="p"
                className="input-error"
              />
            </div>
          </div>

          <div className="form-container__content">
            <Label text="Burs Miktarı:" />
            <div className="form-container__content__input-group">
              <Field
                type="text"
                name="scholarshipAmount"
                className="form__input"
              />
              <ErrorMessage
                name="scholarshipAmount"
                component="p"
                className="input-error"
              />
            </div>
          </div>

          {/* <div className="form-container__content">
            <Label text="Para Birimi:" />
            <div className="form-container__content__input-group">
              <Field as="select" name="currency" className="form__select">
                {currencyType.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="currency"
                component="p"
                className="input-error"
              />
            </div>
          </div> */}

          <div className="form-container__content">
            <Label text="Dönem:" />
            <div className="form-container__content__input-group">
              <Select
                className="form__select"
                value={period}
                onChange={handlePeriod}
                options={periodType}
                isSearchable={true}
                filterOption={(option, input) =>
                  option.label
                    .toLocaleLowerCase("tr")
                    .includes(input.toLocaleLowerCase("tr"))
                }
                placeholder="Dönem seçiniz"
              />
              <ErrorMessage
                name="period"
                component="p"
                className="input-error"
              />
            </div>
          </div>

          <div className="form-container__content">
            <Label text="Süre:" />
            <div className="form-container__content__input-group">
              <Field
                type="text"
                name="duration"
                className="form__input"
                readOnly={values.period == "Tek Seferlik"}
              />
              <ErrorMessage
                name="duration"
                component="p"
                className="input-error"
              />
            </div>
          </div>

          <Button type="submit" title={buttonTitle}></Button>
        </>
      )}
    </>
  );
};

export default ScholarshipForm;
